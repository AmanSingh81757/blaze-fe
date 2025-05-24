import { UserData } from "@/app/meet/types";

export const verifyExistingUser = async () => {
  const id = localStorage.getItem("userId");
  const uuid = localStorage.getItem("userUuid");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("userToken");

  if (id && uuid && username && token) {
    const userData: UserData = {
      id: parseInt(id),
      uuid,
      username,
      token,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/client/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      return {
        id: parseInt(id),
        uuid,
        username,
        token,
      };
    } catch (error) {
      console.error("User verification failed:", error);
      return null;
    }
  }
  return null;
};

export const createNewUser = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create new user");
    }

    const data: UserData = await response.json();

    // Store in localStorage
    localStorage.setItem("userId", data.id.toString());
    localStorage.setItem("userUuid", data.uuid);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userToken", data.token);

    return data;
  } catch (error) {
    console.error("Failed to create new user:", error);
    throw error;
  }
};
