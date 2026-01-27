import { useState } from "react";
import { toast } from "react-toastify";

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(!enteredName || enteredName.trim() == "" || !enteredEmail || enteredEmail.trim() == "" || !enteredMessage || enteredMessage.trim() ==''){
            return (
                toast.error('Please fill in all fields before submitting the form, in the full format.')
            )
        }
        fetch('api/contactus', {
            method: 'POST',
            body: JSON.stringify({
                name: enteredName,
                email: enteredEmail,
                message: enteredMessage
            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            toast.success("message sent successfully!");
            setEnteredEmail('');
            setEnteredName('');
            setEnteredMessage('');
        })
    }
  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                onChange={(e) => setEnteredMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              className="w-full bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              type="submit"
            >
              Send Message
            </button>
          </form>
  )
}

export default ContactForm