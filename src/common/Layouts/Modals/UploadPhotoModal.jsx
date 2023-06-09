import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { auth, db, storage } from "../../../config/firebase";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  waitForPendingWrites,
  where,
} from "firebase/firestore";
import { wait } from "@testing-library/user-event/dist/utils";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadProdPhotoModal = ({ uploaded, productID }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [userID, setUserID] = useState();
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    setDownloadUrls([]);
  }, []);
  useEffect(() => {
    const getUserID = async () => {
      await auth.onAuthStateChanged((user) => setUserID(user.uid));
      await console.log(userID);
    };
    getUserID();
  }, [userID]);
  useEffect(() => {
    //SIGNAL RECEIVED FROM FORM
    if (uploaded === true) {
      let advance = true;

      fileList.forEach((image) => {
        if (
          !(
            image.originFileObj.type === "image/png" ||
            image.originFileObj.type === "image/jpg" ||
            image.originFileObj.type === "image/jpeg"
          )
        )
          advance = false;
      });
      if (advance) {
        const uploadImages = async () => {
          const imageRefInitial = await ref(storage, `images/${productID}/`);
          const urls = await Promise.all(
            fileList.map(async (image) => {
              const imageName = (await image.originFileObj.name) + uuid();
              const imageRef = ref(storage, `images/${productID}/${imageName}`);
              await uploadBytes(imageRef, image.originFileObj, {
                contentType: `${image.originFileObj.type}`,
                firebaseStorageDownloadTokens: uuid(),
              });
              const downloadURL = await getDownloadURL(imageRef);
              return downloadURL;
            })
          );
          setDownloadUrls(urls);
          await updateDocs(urls);
        };
        uploadImages();
      }
    } else console.log("Signal NOT recieved");
  }, [uploaded]);

  const updateDocs = async (urls) => {
    if (urls && uploaded) {
      const userCollection = collection(db, "users");
      const myQuery = query(userCollection, where("id", "==", userID));
      const productCollection = collection(db, "products");
      const prodQuery = query(
        productCollection,
        where("productID", "==", productID)
      );
      const userDoc = await getDocs(myQuery);
      await updateDoc(userDoc.docs[0].ref, {
        userProducts: arrayUnion(productID),
      });
      const productsDoc = await getDocs(prodQuery);
      await updateDoc(productsDoc.docs[0].ref, {
        images: arrayUnion(...urls),
      });
      console.log(urls);
    }
  };

  return (
    <>
      <Upload
        method="get"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadProdPhotoModal;
