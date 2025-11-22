import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

import LookIcon from "../../assets/svgs/look.svg?react";
import DbIcon from "../../assets/svgs/db.svg?react";
import AiIcon from "../../assets/svgs/ai.svg?react";
import TrustIcon from "../../assets/svgs/trust.svg?react";
import SendIcon from "../../assets/svgs/send.svg?react";

const ChatbotSection = () => {
    const [msg, setMsg] = useState("");
    const [history, setHistory] = useState([
        { type: 'bot', text: '안녕하세요! \n금융이나 정책 관련해서 궁금한 점이 있으신가요? \nAI 상담원에게 물어보세요!' }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = () => {
        if (!msg.trim()) return;
        
        const userMsg = msg;
        setHistory(prev => [...prev, { type: 'user', text: userMsg }]);
        setMsg("");

        setTimeout(() => {
            setHistory(prev => [...prev, { 
                type: 'bot', 
                text: `"${userMsg}"에 대한 정보를 찾고 있습니다...\n잠시만 기다려주세요.` 
            }]);
        }, 800);
    };

    return (
        <Container>
            <LeftInfo>
                <Title>서비스 안내</Title>
                <Box>
                    <Desc>
                        코스콤 AICC와 연계하여<br/>
                        당신에게 맞춤형 정책 정보를 제공하고<br/>
                        AI 금융상담을 통해 최적의 대응 솔루션을 안내합니다.
                    </Desc>
                    <FeatureList>
                        <FeatureItem>
                            <LookIcon width="68" height="68"/>
                            <div>
                                <strong>코스콤 AICC 연계</strong>
                                <p>공공 정책 연계형 정보 매칭</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <DbIcon width="68" height="68"/>
                            <div>
                                <strong>정책 지원 DB</strong>
                                <p>최신 장학금, 대출, 복지 정책 반영</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <AiIcon width="68" height="68"/>
                            <div>
                                <strong>AI 맞춤 상담</strong>
                                <p>필요시 GPT 기반 금융 코치 제공</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <TrustIcon width="68" height="68"/>
                            <div>
                                <strong>신뢰성 보장</strong>
                                <p>사전 검증된 공공 정보만 제공합니다</p>
                            </div>
                        </FeatureItem>
                    </FeatureList>
                </Box>
            </LeftInfo>

            <ChatWrapper>
                <ChatHeader>AICC 금융상담 챗봇</ChatHeader>
                <MsgArea ref={scrollRef}>
                    {history.map((m, i) => (
                        <BubbleRow key={i} isUser={m.type === 'user'}>
                            <Bubble isUser={m.type === 'user'}>{m.text}</Bubble>
                        </BubbleRow>
                    ))}
                </MsgArea>
                <InputArea>
                    <InputWrapper>
                        <Input 
                            placeholder="질문을 입력하세요..." 
                            value={msg} 
                            onChange={e => setMsg(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            height="50px"
                            style={{fontSize: '1.6rem'}}
                            variant="gray"
                        />
                    </InputWrapper>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={handleSend}
                        style={{width: '70px', padding: '0'}}
                    >
                        <SendIcon width="30" height="30" />
                    </Button>
                </InputArea>
            </ChatWrapper>
        </Container>
    );
};

export default ChatbotSection;

const Container = styled.div`
    display: flex; 
    gap: 50px; 
    @media(max-width: 768px) { flex-direction: column; }
`;

const LeftInfo = styled.div`
    background: white;
    // border: 1px solid #E5E7EB;
    box-shadow: 0px 4px 12px #00000011;
    border-radius: 13px;
    flex: 1;
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    padding: 26px;
`;

const Title = styled.h2`
    font-size: 2.5rem; 
    font-weight: bold;
    margin-bottom: 26px;
    color: ${({theme}) => theme.colors.primary[500]};
`;

const Box = styled.div`
    background: ${({theme}) => theme.colors.background};
    border-radius: 13px;
    padding: 26px 26px 39px;
`;

const Desc = styled.p`
    font-size: 1.6rem; 
    color: ${({theme}) => theme.colors.fontSecondary};
    line-height: 1.3;
    margin-bottom: 26px;
`;

const FeatureList = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 32px;
`;

const FeatureItem = styled.div`
    display: flex; 
    align-items: center; 
    gap: 26px;
    
    strong { font-size: 2.4rem; font-weight: bold; display: block; margin-bottom: 5px; }
    p { font-size: 1.6rem; font-weight: medium; color: ${({theme}) => theme.colors.fontSecondary}; }
`;

const ChatWrapper = styled.div`
    flex: 1.2;
    border: 1px solid ${({theme}) => theme.colors.gray};
    border-radius: 13px;
    display: flex; 
    flex-direction: column;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.11);
`;

const ChatHeader = styled.div`
    padding: 26px;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.primary[500]};
`;

const MsgArea = styled.div`
    flex: 1;
    padding: 26px;
    overflow-y: auto;
    background: ${({theme}) => theme.colors.background};
    display: flex; 
    flex-direction: column; 
    gap: 12px;
`;

const BubbleRow = styled.div<{isUser:boolean}>`
    display: flex; 
    justify-content: ${({isUser})=>isUser?'flex-end':'flex-start'};
`;

const Bubble = styled.div<{isUser:boolean}>`
    padding: 12px 18px;
    border-radius: 18px;
    border-top-left-radius: ${({isUser})=>isUser?'18px':'4px'};
    border-top-right-radius: ${({isUser})=>isUser?'4px':'18px'};
    max-width: 80%;
    font-size: 1.5rem;
    line-height: 1.5;
    white-space: pre-line;
    
    background: ${({isUser, theme}) => isUser ? theme.colors.primary[500] : 'white'};
    color: ${({isUser}) => isUser ? 'white' : '#374151'};
    box-shadow: ${({isUser}) => isUser ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'};
`;

const InputArea = styled.div`
    padding: 16px 26px;
    background: white;
    border-top: 1px solid ${({theme}) => theme.colors.gray};
    display: flex; 
    gap: 13px; 
    align-items: center;
`;

const InputWrapper = styled.div`
    flex: 1;
`;