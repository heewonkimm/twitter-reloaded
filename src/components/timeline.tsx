import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 50vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Timeline() {
  const [tweet, setTweet] = useState<ITweet[]>([]);
  useEffect(()=> {
    let unsubscribe : Unsubscribe | null = null;
    const fetchTweets = async() => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc"),
        limit(25),
      );
      /*const snapShot = await getDocs(tweetsQuery);
      const tweets = snapShot.docs.map((doc) => {
        const { tweet, createAt, userId, username, photo } = doc.data();
        return {
          tweet, createAt, userId, username, photo, id: doc.id
        }
      });*/
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot)=> {
        const tweets = snapshot.docs.map(
          (doc) => {
            const { tweet, createAt, userId, username, photo } = doc.data();
            return {
              tweet, createAt, userId, username, photo, id: doc.id
            }
          }
        )
        setTweet(tweets);
      });
    }
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  },[])

  return(
    <Wrapper>
      {tweet.map((tweet) => <Tweet key={tweet.id} {...tweet}/>)}
    </Wrapper>
  )
}