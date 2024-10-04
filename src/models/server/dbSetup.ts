import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database created");
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection created");
      console.log("Database created");
    } catch (err) {
      console.log("Error creating databases or collections", err);
    }
  }
  return databases;
}
