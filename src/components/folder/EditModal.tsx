import styled from 'styled-components';
import EditPencilIcon from '@svg/folder/edit-pencil-icon.svg';
import TrashIcon from '@svg/folder/trash-icon.svg';
import GlassIcon from '@svg/glass-icon.svg';
import CopyIcon from '@svg/copy-icon.svg';
import ModalHandleBarIcon from '@svg/modal-handle-bar.svg';
import { useRouter } from 'next/router';
import { Folder, FolderUrlGetRequest } from '@/types/folder';
import { useShareFolder } from '@/hooks/api/useFolder';
import { useState } from 'react';

interface Props {
  type: string;
  targetFolder?: Folder;
  shareTargetId?: number;
  onClose: () => void;
  onCopy?: (text: string) => Promise<boolean>;
}

const EditModal = (props: Props) => {
  const router = useRouter();
  const { type, targetFolder, shareTargetId, onClose, onCopy } = props;
  const [queryInput, setQueryInput] = useState<FolderUrlGetRequest>({
    folderId: Number(shareTargetId),
    copyable: false,
  });
  const { refetch, error } = useShareFolder(queryInput, false);

  const handleColorChange = () => {
    router.push(
      {
        pathname: '/folder/edit-color',
        query: {
          folderId: targetFolder?.folderId,
          folderName: targetFolder?.folderName,
          folderColor: targetFolder?.folderColor,
        },
      },
      '/folder/edit-color',
    );
  };

  const handleDelete = () => {
    router.push(
      {
        pathname: '/folder/delete',
        query: {
          folderId: targetFolder?.folderId,
        },
      },
      '/folder/delete',
    );
  };

  const handleShare = async (type: string) => {
    setQueryInput({
      ...queryInput,
      copyable: type === 'readonly' ? false : true,
    });
    const response = await refetch();
    if (typeof response?.data?.url === 'string' && onCopy) {
      onCopy(response.data.url);
    }
    if (error) {
      alert("폴더 공유에 실패했어요. 다시 시도해주세요.")
    }
    onClose();
  };

  return (
    <Wrapper>
      <ModalBg onClick={() => props.onClose()} />
      <Modal>
        <ModalHeader>
          <ModalHandleBarIcon />
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            <Title>{type === 'share' ? '공유하기' : '편집하기'}</Title>
          </ModalTitle>
          <div
            className="modal-btn edit-btn"
            onClick={
              type === 'share'
                ? () => handleShare('readonly')
                : () => handleColorChange()
            }
          >
            {type === 'share' ? '보기 전용으로 공유하기' : '폴더 색상 수정'}
            {type === 'share' ? <GlassIcon /> : <EditPencilIcon />}
          </div>
          <div
            className="modal-btn delete-btn"
            onClick={
              type === 'share' ? () => handleShare('copy') : () => handleDelete()
            }
          >
            {type === 'share' ? '복제 허용으로 공유하기' : '삭제하기'}
            {type === 'share' ? <CopyIcon /> : <TrashIcon />}
          </div>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

export default EditModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  max-width: 480px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  flex-shrink: 0;
  z-index: 20;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  max-width: 480px;
  height: 100%;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
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
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 18px;
  padding-bottom: 51px;
  .modal-btn {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 18px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background: var(--Neutral-100, #f4f5f7);

    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px; /* 131.25% */
    letter-spacing: -0.32px;
  }
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
