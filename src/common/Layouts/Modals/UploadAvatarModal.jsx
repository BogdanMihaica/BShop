import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../config/firebase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const props = {
  name: "file",
  method: "get",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(info.file);
      const uploadAndGetUrl = async () => {
        const imageName = (await info.file.originFileObj.name) + uuid();
        const imageRef = await ref(storage, `images/avatars/${imageName}`);
        await uploadBytes(imageRef, info.file.originFileObj, {
          contentType: `${info.file.originFileObj.type}`,
          firebaseStorageDownloadTokens: uuid(),
        });
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      };
      uploadAndGetUrl()
        .then(async (url) => {
          const userCollection = collection(db, "users");
          const myQuery = query(
            userCollection,
            where("id", "==", auth.currentUser.uid)
          );
          const userDoc = await getDocs(myQuery);
          await updateDoc(userDoc.docs[0].ref, {
            avatarUrl: url,
          });
          await sessionStorage.setItem("pfpUrl", url);
        })
        .then(() => {
          window.location.reload(false);
        })
        .then(
          message.success(
            `${info.file.name} was uploaded as your profile picture!`
          )
        );
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const UploadAvatarModal = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>New profile photo</Button>
  </Upload>
);
export default UploadAvatarModal;
