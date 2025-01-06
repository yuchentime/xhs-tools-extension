export const collectComments = async () => {
  let atEnd = false;
  for (let i = 0; i < 2; i++) {
    console.log('Collecting comments...');
    const parentComments = document.querySelectorAll('.parent-comment');
    for (const parentComment of parentComments) {
      const comment = handleParentComment(parentComment);
      console.log('Comment:', comment);
    }
    await new Promise((resolve) =>
      setTimeout(resolve, (Math.random() * 3 + 1) * 1000 + 2000)
    );
    // 指定滚动元素
    const scrollElement = document.querySelector('.comments-container');
    // 滚动到指定位置
    scrollElement.scrollTo({
      top: 500, // 垂直滚动位置
      left: 0, // 水平滚动位置
      behavior: 'smooth', // 可选，平滑滚动
    });
  }
  console.log('Finished collecting comments!');
  return true;
};

const handleParentComment = (parentComment) => {
  const commentItem = parentComment.querySelector('.comment-item');
  const commentId = commentItem.getAttribute('id');
  const commentText = commentItem.textContent;
  let subComments = new Set();
  const replyContainer = parentComment.querySelector('.reply-container');
  if (replyContainer) {
    subComments = handleMoreSubComments(replyContainer);
  }
  return {
    id: commentId,
    text: commentText,
    subComments,
  };
};

const handleMoreSubComments = async (replyContainer) => {
  const subComments = new Set();

  const replies = replyContainer.querySelectorAll('.comment-item-sub');
  replies.forEach((reply) => {
    const replyId = reply.getArrtibute('id');
    const replyText = reply.textContent;
    console.log('Reply:', replyText);
    subComments.add({ id: replyId, text: replyText });
  });

  const showMore = replyContainer.querySelector('.show-more');
  if (showMore) {
    showMore.click();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleMoreSubComments(replyContainer);
  }
  return subComments;
};
