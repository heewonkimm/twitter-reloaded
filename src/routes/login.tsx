import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Wrapper, Title, Input, Form, Switcher, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value} } = e;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if(isLoading || email === "" || password === "") return
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

    } catch(e) {
      if( e instanceof FirebaseError) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Wrapper>
      <Title>Login 합시다~!</Title>
      <Form onSubmit={onSubmit}>
        <Input 
          onChange={onChange}
          name="email" value={email} placeholder="이메일 입력해라" type="email" required/>
        <Input 
          onChange={onChange}
          name="password" value={password} placeholder="패스워드 입력해라" type="password" required/>
        <Input 
          onChange={onChange}
          type="submit" value={isLoading ? "로딩중...": "로그인이다!"}/>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        혹시 계정이 없니??{" "}
        <Link to="/create-account">계정 만들기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  )
}