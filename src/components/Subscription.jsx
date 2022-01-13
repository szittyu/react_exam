import React, { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";

const Subscription = ({ onSubscribed }) => {
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);


  const subscribe = () => {
    setLoading(true);
    fetch("https://seriescharacters.com/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailText })
    }).then((r) => {
      r.json();
    }).then(() => {
      setLoading(false);
      setSuccess(true);
      onSubscribed();
    });
  }

  const handleChange = (e) => {
    setEmailText(e.target.value)
  }

  
  useEffect(() => {
    if(emailText.includes("@") && emailText.includes(".")){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  }, [emailText])

  return (
    <div>
      <h1>Subscribe to our newsletter</h1>
      {success ? <h2>Subscribed</h2> : 
        <>
          {loading ? <LoadingMask />
            :
            <>
              <input type="email" value={emailText} onChange={handleChange} />
              <button onClick={subscribe} disabled={isDisabled}>Subscribe</button>
            </>
          }
        </>
      }
    </div>
  )
};

export default Subscription;