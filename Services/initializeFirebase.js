import path from "path";
import fs from "fs";
import url from "url";
import admin from "firebase-admin";

const initializeFirebase = () => {
  //CURRENT WORKING FILE PATH
  const __filename = url.fileURLToPath(import.meta.url);
  //NAME OF THE DIRECTORY
  const __dirname = path.dirname(__filename);

  //READ SDK
  const serviceAccountPath = path.join(
    __dirname,
    "../Config/connect-1d92d-firebase-adminsdk-behlf-866cceef8a.json"
  );
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  //INITIALZE APP
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "connect-1d92d.appspot.com", 
  });
};

export default initializeFirebase;