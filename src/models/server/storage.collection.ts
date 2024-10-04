import { Permission } from "node-appwrite";
import { questionAttachmentsBucket, db } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentsBucket);
    console.log("Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentsBucket,
        questionAttachmentsBucket,
        [
          Permission.read("any"),
          Permission.read("users"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );
      console.log("Storage Created");
      console.log("Storage Connected");
    } catch (err) {
        console.error("Error Creating Storage:",err);
    }
  }
}
