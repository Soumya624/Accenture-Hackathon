import {createChatBotMessage} from 'react-chatbot-kit'

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#3d946e",
      fontSize:"10px"
    },
    chatButton: {
      backgroundColor: "#3d946e",
      fontSize:"10px"
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi I'm . I’m here to help you explain how I work.`
    ),
    createChatBotMessage(
      "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
      {
        withAvatar: false,
        delay: 500,
        fontSize:"10px"
      }
    ),
  ],
}

export default config