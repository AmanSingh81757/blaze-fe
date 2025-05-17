"use client";
import { ChatWindow } from "@/components/ChatWindow";
import { VideoCallPanel } from "@/components/VideoCallPanel";
import { useState, useEffect, useRef } from "react";
import { initiateClientId } from "@/utils/client";
import { ConnectionDetails } from "@/components/ConnectionDetails";

export default function Meet() {
  const [clientID, setClientID] = useState("");
  const [targetID, setTargetID] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const clientIDRef = useRef("");
  const socketRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleReceiveMessage = async (event: MessageEvent) => {
    try {
      const parsedData = JSON.parse(event.data) as WebSocketMessage;
      console.log("Received JSON Parsed as:", parsedData);

      switch (parsedData.type) {
        case "message":
          const msg: ChatMessage = {
            type: "message",
            message: parsedData.message,
            isSelf: false,
          };
          setMessages((prevMessages) => [...prevMessages, msg]);
          break;

        case "sdp-offer":
          // Peer is calling us:
          if (!pcRef.current) {
            console.error("RTCPeerConnection is not initialized");
            return;
          }
          await pcRef.current.setRemoteDescription(parsedData.data);
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          const answerMsg: SDPAnswerMessage = {
            type: "sdp-answer",
            data: answer,
          };
          sendMessage(answerMsg);
          break;

        case "sdp-answer":
          // They answered our offer:
          if (!pcRef.current) {
            console.error("RTCPeerConnection is not initialized");
            return;
          }
          await pcRef.current.setRemoteDescription(parsedData.data);
          break;

        case "ice-candidate":
          // They found a new network path:
          if (!pcRef.current) {
            console.error("RTCPeerConnection is not initialized");
            return;
          }
          await pcRef.current.addIceCandidate(parsedData.data);
          break;

        case "matched":
          setMessages([]);
          setTargetID(parsedData.client_id);
          await startWebRTC(clientIDRef.current < parsedData.client_id);
          break;

        case "disconnected":
          setMessages([]);
          setTargetID("");

          // Close WebRTC connection
          if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
            console.log("RTCPeerConnection closed.");
          }

          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
          break;

        default:
          console.warn("Unknown message type:", parsedData);
      }
    } catch (error) {
      console.error("Error parsing JSON:", event.data, "error: ", error);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      console.error("Message is empty");
      return;
    }
    const msg: ChatMessage = {
      type: "message",
      message: message,
      isSelf: true,
    };
    sendMessage(msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage("");
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (!socketRef.current) {
      console.error("WebSocket is not connected, cannot send message: ", msg);
      return;
    }
    if (socketRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open");
      return;
    }
    console.log("Sending messageType:", JSON.stringify(msg.type));
    socketRef.current.send(JSON.stringify(msg));
  };

  async function startCamera(
    localVideoRef: React.RefObject<HTMLVideoElement | null>,
    localStreamRef: React.RefObject<MediaStream | null>,
  ) {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = localStream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      console.log("Local video stream set successfully.");
    }
  }

  async function startWebRTC(isCaller: boolean) {
    const pcConfig: RTCConfiguration = {
      iceServers: [
        {
          urls: [process.env.NEXT_PUBLIC_TURN_SERVER_URL || ""],
          username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
          credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
        },
      ],
    };
    const pc = new RTCPeerConnection(pcConfig);
    pcRef.current = pc;
    console.log("RTCPeerConnection created successfully.");

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const msg: IceCandidateMessage = {
          type: "ice-candidate",
          data: e.candidate,
        };
        sendMessage(msg);
      }
    };

    pc.ontrack = (e) => {
      if (!remoteVideoRef.current) {
        console.error("Remote video ref is not initialized");
        return;
      }

      const [videoTrack] = e.streams[0].getVideoTracks();
      const [audioTrack] = e.streams[0].getAudioTracks();

      if (videoTrack) {
        console.log("Remote video track received:", videoTrack);

        // Handle the initial state of the video track
        if (!videoTrack.enabled) {
          console.log("Remote video track is initially muted");
          remoteVideoRef.current.srcObject = null; // Hide video if initially muted
        } else {
          remoteVideoRef.current.srcObject = e.streams[0]; // Show video if enabled
        }

        // Attach event listeners to handle track state changes
        videoTrack.onmute = () => {
          if (!remoteVideoRef.current) {
            console.error("Remote video ref is not initialized");
            return;
          }
          console.log("Remote video track muted");
          remoteVideoRef.current.srcObject = null; // Hide video when muted
        };

        videoTrack.onunmute = () => {
          if (!remoteVideoRef.current) {
            console.error("Remote video ref is not initialized");
            return;
          }
          console.log("Remote video track unmuted");
          remoteVideoRef.current.srcObject = e.streams[0]; // Show video when unmuted
        };

        // Set the video stream initially
        remoteVideoRef.current.srcObject = e.streams[0];
      } else {
        console.warn("No video track found in the stream.");
      }

      // Handle audio track
      if (audioTrack) {
        console.log("Remote audio track received:", audioTrack);

        audioTrack.onmute = () => {
          // Remote audio track muted
          // TODO: Handle Ui changes for audio mute
        };

        audioTrack.onunmute = () => {
          // Remote audio track unmuted
          // TODO: Handle Ui changes for audio unmute
        };
      } else {
        console.warn("No audio track found in the stream.");
      }
    };

    if (!localStreamRef.current) {
      console.error("Local stream is not initialized");
      return;
    }
    localStreamRef.current
      .getTracks()
      .forEach((track) => pc.addTrack(track, localStreamRef.current!));

    if (isCaller) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const offerMsg: SDPMessage = {
        type: "sdp-offer",
        data: offer,
      };
      sendMessage(offerMsg);
    }
  }

  useEffect(() => {
    const id = initiateClientId();
    setClientID(id);

    startCamera(localVideoRef, localStreamRef).catch((error) => {
      console.error("Error starting camera:", error);
    });

    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8080",
    );
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ type: "identity", id: id }));
    };

    ws.onclose = () => {
      ws.send(JSON.stringify({ type: "disconnected" }));
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = handleReceiveMessage;

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "disconnect" }));
        socket.close();
      }
    };
  }, []);

  // for clientID
  useEffect(() => {
    clientIDRef.current = clientID; // Keep the ref in sync with the state
  }, [clientID]);

  // for socket
  useEffect(() => {
    socketRef.current = socket; // Keep the ref in sync with the state
  }, [socket]);

  return (
    <main
      className="h-screen w-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #dcebff, #ebdcfb, #fbe5f0, #f7faff)",
      }}
    >
      <ConnectionDetails clientID={clientID} targetID={targetID} />
      <section className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-10 gap-4 h-full p-4 flex-grow bg-transparent">
        {/* Video Call Panel */}
        <VideoCallPanel
          className="w-full col-span-1 lg:col-span-9 md:col-span-7"
          localVideoRef={localVideoRef}
          localStreamRef={localStreamRef}
          remoteVideoRef={remoteVideoRef}
          socket={socket}
        />
        {/* Chat Window */}
        <ChatWindow
          className="w-full h-1/3 lg:h-full col-span-1 md:col-span-3 hidden md:flex"
          message={message}
          messages={messages}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          socket={socket}
        />
      </section>
    </main>
  );
}
