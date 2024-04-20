import { InsightPostRequest } from '@/types/insight';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetFolder } from '@/hooks/api/useFolder';
import { colorDecoder } from '@/utils/folder';
import { FolderGetResponse } from '@/types/folder';
import GrabberIcon from '@svg/upload/grabber-icon.svg';
import SearchSection from '../common/SearchSection';

type Props = {
  onClose: () => void;
  onSelect: React.Dispatch<React.SetStateAction<InsightPostRequest>>;
  selectedFolder: string;
  insightInput: InsightPostRequest;
};

const SelectFolderModal = (props: Props) => {
  const [isMakingFolder, setIsMakingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(props.selectedFolder);

  const { data } = useGetFolder();

  const [folderList, setFolderList] = useState<FolderGetResponse | undefined>([
    {
      folderId: 1,
      folderName: 'UX/UI',
      folderColor: 'PINK',
      insightCount: 0,
    },
    {
      folderId: 2,
      folderName: '미드저니',
      folderColor: 'BLUE',
      insightCount: 0,
    },
    {
      folderId: 3,
      folderName: 'SEO',
      folderColor: 'ORANGE',
      insightCount: 0,
    },
    {
      folderId: 4,
      folderName: '기획',
      folderColor: 'GREEN',
      insightCount: 0,
    },
  ]);

  useEffect(() => {
    setFolderList(data);
  });
  const handleBlur = () => {
    setIsMakingFolder(false);
    setNewFolderName('');
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      setNewFolderName('');
      setIsMakingFolder(false);
    }
  };

  const handleFolder = (folder: string) => {
    props.onSelect({ ...props.insightInput, folderName: folder });
    setFolderList(folderList);
    props.onClose();
  };

  return (
    <>
      <Wrapper>
        <ModalHeader>
          <GrabberIcon />
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            <Title>폴더 설정</Title>
            <CompleteBtn onClick={() => handleFolder(selectedFolder)}>
              저장
            </CompleteBtn>
          </ModalTitle>
          <SearchSection placeholder="폴더 검색" />
          <FolderSection>
            <AddFolder onClick={() => setIsMakingFolder(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="75"
                viewBox="0 0 100 75"
                fill="none"
              >
                <rect width="100" height="75" rx="5" fill="#B6B5B5" />
                <path
                  d="M50.875 30V45.75"
                  stroke="white"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
                <path
                  d="M58.75 37.875L43 37.875"
                  stroke="white"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
              </svg>
              {isMakingFolder ? (
                <FolderInput
                  value={newFolderName}
                  placeholder="폴더 이름 입력"
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDownCapture={(e) => checkEnter(e.key)}
                />
              ) : (
                <FolderTitle>새 폴더 만들기</FolderTitle>
              )}
            </AddFolder>
            <FolderList>
              {folderList?.map((folder, idx) => (
                <Folder
                  key={idx}
                  onClick={() => setSelectedFolder(folder.folderName)}
                  className={
                    selectedFolder === folder.folderName ? 'selected' : ''
                  }
                >
                  {folder.folderColor === null
                    ? colorDecoder('BLUE', 'small')
                    : colorDecoder(folder.folderColor, 'small')}
                  {folder.folderName}
                </Folder>
              ))}
            </FolderList>
          </FolderSection>
        </ModalBody>
      </Wrapper>
      <ModalBg onClick={() => props.onClose()} />
    </>
  );
};

export default SelectFolderModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  max-width: 480px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  flex-shrink: 0;
  z-index: 20;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Neutral-150, #e1e1e1);
  border-radius: 8px 8px 0px 0px;
  background: white;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 608px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 0px;
  gap: 34px;
`;

const ModalTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  text-align: center;
  /* Body-18-B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  margin-top: 18px;
`;

const CompleteBtn = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  color: var(--Primary-500, #3184ff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  cursor: pointer;
`;

const FolderSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const AddFolder = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  cursor: pointer;
  padding: 0px 21px;
`;

const FolderTitle = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  /* Body-18-B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
`;

const FolderInput = styled.input`
  outline: none;
  border: none;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.32px;
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  .selected {
    background: var(--Neutral-100, #f4f5f7);
    border-radius: 8px;
  }
`;

const Folder = styled(AddFolder)`
  display: flex;
  width: 100%;
  height: 96px;
  padding: 0px 20px;
`;
