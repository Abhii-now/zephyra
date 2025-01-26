// filepath: /Users/abhinavjain/dev/zephyra/zephyra/src/cryptoUtils.js
export async function generateKey() {
  // Generate a random key hitting get request to http://127.0.0.1:8000/mynewapp/generate-aes-key/
  const response = await fetch(
    "http://127.0.0.1:8000/mynewapp/generate-aes-key/"
  );
  console.log(response);
  const data = await response.json();

  const keyBuffer = Uint8Array.from(atob(data.key), (c) => c.charCodeAt(0));

  return await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptFiles(files) {
  const key = await generateKey();
  return await Promise.all(
    files.map(async (file) => {
      const { encryptedBuffer, iv } = await encryptFile(file, key);
      return {
        name: file.name,
        size: file.size,
        dateModified: file.lastModifiedDate,
        lastModifiedDate: file.lastModifiedDate,
        encryptedBuffer,
        iv,
        key,
      };
    })
  );
}

export async function encryptFile(file, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const fileBuffer = await file.arrayBuffer();
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    fileBuffer
  );
  return { encryptedBuffer, iv };
}

export async function decryptFile(encryptedBuffer, key, iv) {
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedBuffer
  );
  return decryptedBuffer;
}
export function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
