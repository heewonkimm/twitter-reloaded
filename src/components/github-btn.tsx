import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  width: 100%;
  color: black;
  margin-top: 50px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider)
      navigate("/");
    } catch(e) {
      console.log(e)
    } finally {

    }
  }
  return(
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg"/>
      * 깃허브로 로그인할수 있어요 *
    </Button>
  )
}