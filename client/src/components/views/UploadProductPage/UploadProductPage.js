import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from 'axios'
const { TextArea } = Input;
const Products = [
  { key: 1, value: "상의" },
  { key: 2, value: "하의" },
  { key: 3, value: "신발" },
  { key: 4, value: "모자" },
  { key: 5, value: "시계" },
  { key: 6, value: "반지" },
  { key: 7, value: "목걸이" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [ProductValue, setProductValue] = useState(1);
  const [Images, setImages] = useState([]);

  const TitleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const DescriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const PriceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
    // inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const ProductChangeHandler = (event) => {
    setProductValue(event.currentTarget.value);
  };
  const updateImages =(newImages)=>{
    setImages(newImages)
  }
  const submitHandler =(event)=>{
    event.preventDefault();
    //유효성 체크 모든 칸이 체워지지 않으면 submit이 될수 없다.
    if(!Title || !Description || !Price || !Products || !Image){
      return alert('모든 값이 채워 주시지 바람니다.')
    }
    //서버에 채운 값들을 request로 보내준다.
    const body={
       //로그인 된 사람의 아이디
       write:props.user.userData._id,
       title: Title,
       Description: Description,
       price: Price,
       images:Images,
       productvalue:ProductValue
    }
    axios.post('/api/product', body)
    .then(response =>{
      if(response.data.success){
        alert('상품 업로드에 성공 했습니다.')
        props.history.push('/')
      }
      else{
        alert('이미지 업로드에 성공')
      }
    })
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>상품 업로드</h2>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages}/>
        <br />
        <br />
        <label>상품명</label>
        <Input onChange={TitleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={DescriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={PriceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={ProductChangeHandler} value={ProductValue}>
          {/* 이부분의 onChange는  option의 value가 바뀔수 있게 해주는 역할*/}

          {Products.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
          {/* map 항목들을 하나씩 컨트롤이 가능 */}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>확인</Button>      
        </Form>
    </div>
  );
}

export default UploadProductPage;
