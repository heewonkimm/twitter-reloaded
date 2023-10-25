import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value} } = e;
    if(name === "name") {
      setName(value)
    } else if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if(isLoading || name === "" || email === "" || password === "") return
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user)
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
      <Title>JOIN 합시다~!</Title>
      <Form onSubmit={onSubmit}>
        <Input 
          onChange={onChange}
          name="name" value={name} placeholder="이름이다" type="text" required/>
        <Input 
          onChange={onChange}
          name="email" value={email} placeholder="이메일 입력해라" type="email" required/>
        <Input 
          onChange={onChange}
          name="password" value={password} placeholder="패스워드 입력해라" type="password" required/>
        <Input 
          onChange={onChange}
          type="submit" value={isLoading ? "로딩중...": "계정 생성이다!"}/>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 있니??{" "}
        <Link to="/login">로그인하기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  )
}