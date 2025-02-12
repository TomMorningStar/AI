import React from 'react'
import { useParams } from 'react-router-dom'
import { FIRST_TEXT, LAST_TEXT, LIST } from '../../root/data'
import { openai } from '../../services/deepseekService'
import { IChatMessage } from '../../types/game'
import { Chat } from '../../widgets/detail'
import { Message } from '../../widgets/detail/ui/message/Message'
import { Title } from '../../widgets/title'

interface Props {
  className?: string;
}

export const Detail: React.FC<Props> = ({ className }) => {
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<IChatMessage[]>([]);
  const { genre } = useParams();
  const selectedGenre = LIST.find((el) => {
    return el.id === Number(genre);
  });

  console.log(messages);

  const getMessage = async (newMessage: IChatMessage) => {
    setLoading(true);
    setResponse(''); // Сбрасываем предыдущий ответ

    try {
      const history = [...messages, newMessage];

      const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat',
        messages: history,
        stream: true,
      });

      let accumulatedResponse = '';
      for await (const chunk of completion) {
        const chunkContent = chunk.choices[0]?.delta?.content || '';
        accumulatedResponse += chunkContent;

        setResponse((prev) => {
          const lastSpaceIndex = accumulatedResponse.lastIndexOf(' ');
          return (
            prev +
            accumulatedResponse.slice(prev.length, lastSpaceIndex > 0 ? lastSpaceIndex : undefined)
          );
        });

        await new Promise((resolve) => setTimeout(resolve, 20));

        setResponse(accumulatedResponse);
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1]?.role === 'assistant') {
            newMessages[newMessages.length - 1].content = accumulatedResponse;
          } else {
            newMessages.push({ role: 'assistant', content: accumulatedResponse });
          }
          return newMessages;
        });
      }

      console.log(messages);
    } catch (error) {
      console.error('API Error:', error);
      setResponse('Ошибка при получении ответа');
    } finally {
      setLoading(false);
    }
  };

  // Обработчик кнопок жанров
  const handleGenreClick = (num: string) => {
    const message = {
      role: 'user' as const,
      content: num,
    };
    setMessages((prev) => [...prev, message]);
    getMessage(message);
  };

  React.useEffect(() => {
    getMessage({
      role: 'user',
      content: `${FIRST_TEXT} ${selectedGenre?.genre} ${selectedGenre?.description} ${LAST_TEXT}`,
    });
  }, []);

  if (!selectedGenre) {
    return <div>Genre not found</div>;
  }

  return (
    <div className={className}>
      <Title />
      <Message message={response === '' ? 'Думает...' : response} />
      {!loading && <Chat handleGenreClick={handleGenreClick} />}
    </div>
  );
};
