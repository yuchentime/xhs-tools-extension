export const collectComments = async () => {
  try {
    const scrollElement = document.querySelector('.note-scroller');
    const commentContainer = document.querySelector('.comments-container');
    while (true) {
      console.log('Collecting comments...');
      const parentComments = document.querySelectorAll('.parent-comment');

      // 遍历父评论
      for (let i = 0; i < parentComments.length; i++) {
        const parentComment = parentComments[i];
        try {
            const comment = handleParentComment(parentComment);
          //   console.log('Comment:', comment);
        } catch (err) {
          console.error('Error handling parent comment:', err);
        }
        if (i / 5 === 0) {
          scrollView();
        }
      }

      console.log('已完成一轮采集');

      const endContainer = commentContainer.querySelector('.end-container');
      if (endContainer) {
        break;
      }

      // 等待一段时间，模拟延时
      await new Promise((resolve) =>
        setTimeout(resolve, (Math.random() * 3 + 1) * 1000 + 2000)
      );

      // 滚动容器元素
      scrollView();
    }

    console.log('Finished collecting comments!');
    return true;
  } catch (err) {
    console.error('Error collecting comments:', err);
    return false;
  }
};

const handleParentComment = (parentComment) => {
  try {
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
  } catch (err) {
    console.error('Error handling parent comment:', err);
    throw err; // 抛出异常
  }
};

const handleMoreSubComments = async (replyContainer, showCount = 0) => {
  const subComments = [];

  try {
    const subCommentNodes =
      replyContainer.querySelectorAll('.comment-item-sub');
    if (!subCommentNodes || subCommentNodes.length === 0) return subComments;

    subCommentNodes.forEach((subCommentNode) => {
      const replyText = subCommentNode.textContent;
      //   console.log('Reply:', replyText);
      const replyId = subCommentNode.getAttribute('id');
      subComments.push({ id: replyId, text: replyText });
    });

    if (showCount > 0) {
      scrollView();
    }

    const showMore = replyContainer.querySelector('.show-more');
    if (showMore) {
      showMore.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 确保递归的异步调用等待结果
      const moreSubComments = await handleMoreSubComments(
        replyContainer,
        ++showCount
      );
      moreSubComments.forEach((comment) => subComments.push(comment)); // 将新的子评论合并
    }
  } catch (err) {
    console.error('Error handling sub-comments:', err);
  }

  return subComments;
};

const scrollView = (topHeight = 500) => {
  const scrollElement = document.querySelector('.note-scroller');
  if (scrollElement) {
    console.log('Scrolling...');
    scrollElement.scrollBy({
      top: topHeight,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    console.error('Scroll element not found!');
  }
};
