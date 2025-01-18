chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from background script:', message);
  if (message.action === 'translate') {
    const hostname = window.location.hostname;
    if (hostname.includes('/search_result') || hostname.includes('/explore')) {
      translateNoteList();
    } else {
    }

    sendResponse({ status: 'ok' });
  } else if (message.action === 'stopTranslate') {
    sendResponse({ status: 'ok' });
  } else {
    sendResponse({ status: 'error', error: 'Unknown action' });
  }
  return true;
});

const translateNoteList = () => {
  const exploreFeeds = document.getElementById('exploreFeeds');

  // 定义一个回调函数，当 DOM 发生变化时执行
  const callback = (mutationsList, observer) => {
    // 检查是否有子节点变化
    const hasChildListMutation = mutationsList.some(mutation => mutation.type === 'childList');
    
    if (hasChildListMutation) {
      // 重新获取所有的 section 元素
      const sections = exploreFeeds.querySelectorAll('section');
      console.log('Sections updated:', sections);

      // 在这里可以执行其他操作，但避免直接修改 DOM
      // 例如：更新数据、触发事件等
    }
  };

  // 创建一个 MutationObserver 实例，并传入回调函数
  const observer = new MutationObserver(callback);

  // 配置观察选项
  const config = { childList: true, subtree: true };

  // 开始观察 exploreFeeds 元素
  observer.observe(exploreFeeds, config);

  // 初始获取所有的 section 元素
  const sections = exploreFeeds.querySelectorAll('section');
  console.log('Initial sections:', sections);
};

// 调用函数
translateNoteList();

const replaceTitle = (sections) => {
  sections.forEach((section) => {
    const titleEle = section.querySelector('.title > span');
    if (titleEle) {
      // 翻译
      titleEle.innerText = '测试翻译标题';
    }
  });
};

// 调用函数
translateNoteList();

const translateNoteDetail = () => {};
