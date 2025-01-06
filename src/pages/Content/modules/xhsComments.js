export const collectComments = async () => {
  try {
    let prevBatchLastCommentId = null;
    const comments = [];
    const commentContainer = document.querySelector('.comments-container');
    while (true) {
      console.log('Collecting comments...');
      const parentComments = document.querySelectorAll('.parent-comment');
      if (!parentComments || parentComments.length === 0) {
        break;
      }
      console.log('准备采集,', parentComments);
      const lastParentComment = parentComments[parentComments.length - 1];
      const lastCommentItem = lastParentComment.querySelector('.comment-item');
      const lastCommentId = lastCommentItem.getAttribute('id');
      // 检测采集的批次是不是跟上一个批次一样
      if (prevBatchLastCommentId !== lastCommentId) {
        console.log('开始采集');
        // 遍历父评论
        for (let i = 0; i < parentComments.length; i++) {
          const parentComment = parentComments[i];
          try {
            const comment = await handleParentComment(parentComment);
            console.log('Comment:', comment);
            comments.push(comment);
          } catch (err) {
            console.error('Error handling parent comment:', err);
          }
          if (i / 5 === 0) {
            scrollView();
          }
        }
        console.log('已完成一轮采集');
      }
      prevBatchLastCommentId = lastCommentId;

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

    // TODO 对comments去重处理

    console.log('Finished collecting comments!');
    console.log('Comments: ', comments);
    return true;
  } catch (err) {
    console.error('Error collecting comments:', err);
    return false;
  }
};

const handleParentComment = async (parentComment) => {
  try {
    const commentItem = parentComment.querySelector('.comment-item');
    const commentId = commentItem.getAttribute('id');
    const commentText = commentItem.textContent;

    let subComments = [];
    const replyContainer = parentComment.querySelector('.reply-container');
    if (replyContainer) {
      subComments = await handleMoreSubComments(replyContainer);
      // TODO 根据id字段对subComments进行去重
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
      await new Promise((resolve) =>
        setTimeout(resolve, (Math.random() * 2 + 1) * 500)
      );
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
