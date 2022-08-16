import React from "react";

const Form = ({updateMainCat}) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text); // 한글포함 확인
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    function handleInputChange(e) {
      const userValue = e.target.value;
      setErrorMessage('');
      if(includesHangul(userValue)) {
        setErrorMessage('한글은 입력할 수 없습니다');
        // 근데 한글로 입력은안되지만 생성이 되는데..?
      }
      setValue(userValue.toUpperCase());
    }
    function handleFormSubmit(e) {
      e.preventDefault();
      setErrorMessage('');
      if(value === "") {
        setErrorMessage('빈값으로 만들 수 없습니다');
        return;
      }
      updateMainCat(value);
    }
    return (
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="영어 대사를 입력해주세요" 
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">생성</button>
        <p style={{color: "red"}}>{errorMessage}</p>
      </form>
    )
}

export default Form;