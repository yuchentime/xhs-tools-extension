/**
 * 将评论数据导出为CSV文件
 * @param {Array} data - 评论数据数组
 * @param {String} filename - 导出的CSV文件名
 */
export function exportCommentsToCSV(data, filename = 'comments.csv') {
    if (!data || !data.length) {
        console.error('无有效数据可导出。');
        return;
    }

    // 定义CSV的表头
    const headers = ['id', 'text', 'author', 'profileUrl', 'location', 'parentCommentId'];
    const csvRows = [];

    // 添加表头
    csvRows.push('\uFEFF' + headers.join(','));

    // 遍历每个一级评论
    data.forEach(comment => {
        // 构建一级评论的CSV行（parentCommentId为空）
        const mainComment = [
            escapeCSV(comment.id),
            escapeCSV(comment.text),
            escapeCSV(comment.author),
            escapeCSV(comment.profileUrl),
            escapeCSV(comment.location),
            '' // 一级评论没有parentCommentId
        ];
        csvRows.push(mainComment.join(','));

        // 检查是否有二级评论
        if (comment.subComments && comment.subComments.length > 0) {
            // 遍历每个二级评论
            comment.subComments.forEach(subComment => {
                const subCommentRow = [
                    escapeCSV(subComment.id),
                    escapeCSV(subComment.text),
                    escapeCSV(subComment.author),
                    escapeCSV(subComment.profileUrl),
                    escapeCSV(subComment.location),
                    escapeCSV(comment.id) // parentCommentId为一级评论的id
                ];
                csvRows.push(subCommentRow.join(','));
            });
        }
    });

    // 合并所有行
    const csvContent = csvRows.join('\n');

    // 创建一个Blob对象表示CSV文件的数据
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // 创建一个临时的下载链接
    const link = document.createElement("a");
    if (link.download !== undefined) { // 确保浏览器支持download属性
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.error('当前浏览器不支持文件下载功能。');
    }
}

/**
 * 处理CSV字段中的特殊字符（如逗号、双引号、换行符）
 * @param {String} field - 原始字段值
 * @returns {String} - 处理后的字段值
 */
function escapeCSV(field) {
    if (field === null || field === undefined) {
        return '';
    }
    const fieldStr = field.toString();
    // 如果字段包含双引号、逗号或换行符，则需要用双引号括起来，并将双引号转义
    if (fieldStr.search(/("|,|\n)/g) >= 0) {
        return `"${fieldStr.replace(/"/g, '""')}"`;
    }
    return fieldStr;
}
