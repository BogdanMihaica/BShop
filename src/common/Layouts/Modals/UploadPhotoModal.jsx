import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { storage } from "../../../config/firebase";
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
    //SIGNAL RECEIVED FROM FORM
    if (uploaded === true) {
      let advance = true;

      fileList.forEach((image) => {
        if (
          !(
            image.originFileObj.type == "image/png" ||
            image.originFileObj.type == "image/jpg" ||
            image.originFileObj.type == "image/jpeg"
          )
        )
          advance = false;
      });
      if (advance) {
        fileList.forEach((image) => {
          const imageName = image.originFileObj.name + uuid();
          const imageRef = ref(storage, `images/${productID}/${imageName}`);
          uploadBytes(imageRef, image.originFileObj, {
            contentType: `${image.originFileObj.type}`,
            firebaseStorageDownloadTokens: uuid(),
          }).then(() => console.log("SUCCESS"));
        });
      }
    } else console.log("Signal NOT recieved");
  }, [uploaded]);
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
