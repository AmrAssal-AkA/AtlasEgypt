import { toast } from "react-toastify";

export async function newsletterSubscriptionHandler(enteredEmail) {
    if (!enteredEmail || !enteredEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("successfully subscribed to newsletter!");
      }).catch(error => {
        toast.error(error.message || "something went wrong!");
      })
  }