// ページのすべての要素が読み込まれてから実行する
document.addEventListener('DOMContentLoaded', () => {

    // --- suguni.html のタブ機能 ---
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.tab-panel');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('is-active'));
                tab.classList.add('is-active');

                panels.forEach(panel => panel.classList.remove('is-active'));
                const targetPanel = document.getElementById(tab.dataset.tab);
                if(targetPanel) {
                    targetPanel.classList.add('is-active');
                }
            });
        });
    }

    // --- yoin.html のコメント投稿機能 ---
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const videoBefore = document.getElementById('video-before');
    const videoAfter = document.getElementById('video-after');

    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nickname = document.getElementById('nickname-input').value;
            const message = document.getElementById('message-input').value;

            if (nickname.trim() === '' || message.trim() === '') {
                alert('ニックネームとメッセージを入力してください。');
                return;
            }

            if (videoBefore && videoAfter) {
                videoBefore.classList.remove('is-active');
                videoAfter.classList.add('is-active');
            }

            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            newComment.innerHTML = `
                <p class="comment-item__nickname comment-item__nickname--special">${nickname}</p>
                <p class="comment-item__text">${message}</p>
            `;

            commentList.prepend(newComment);
            commentForm.reset();
        });
    }

    // --- suguni.html の開閉機能 ---
    const routeTrigger = document.getElementById('route-trigger');
    
    if (routeTrigger) {
        const routeContainer = routeTrigger.closest('.collapsible');
        routeTrigger.addEventListener('click', () => {
            routeContainer.classList.toggle('is-open');
        });
    }


    // --- home.html の位置情報許可モーダル機能 ---
    const homePageContent = document.getElementById('home-page-content');
    if (homePageContent) {
        const locationModal = document.getElementById('location-modal');
        const locationDenyBtn = document.getElementById('location-deny');
        const locationAllowBtn = document.getElementById('location-allow');
        
        //【ここから修正】
        // localStorageに確認済みの記録があるかチェック
        if (!localStorage.getItem('locationPermissionAsked')) {
            // 記録がなければモーダルを表示
            locationModal.classList.remove('is-hidden');
            homePageContent.classList.add('is-blurred');
        }

        // 「いいえ」「はい」ボタンでモーダルを閉じて、記録を残す
        const closeLocationModal = () => {
            locationModal.classList.add('is-hidden');
            homePageContent.classList.remove('is-blurred');
            // localStorageに「確認済み」という記録を残す
            localStorage.setItem('locationPermissionAsked', 'true');
        };
        locationDenyBtn.addEventListener('click', closeLocationModal);
        locationAllowBtn.addEventListener('click', closeLocationModal);
        //【ここまで修正】
    }


    // --- yoin.html のエリアチェック機能 ---
    const yoinPageContent = document.getElementById('yoin-page-content');
    if (yoinPageContent) {
        const guidanceModal = document.getElementById('guidance-modal');
        const checkinModal = document.getElementById('checkin-modal');
        const guidanceImage = document.getElementById('guidance-image');
        const checkinBtn = document.getElementById('checkin-button');

        const showPageContent = () => {
            guidanceModal.classList.add('is-hidden');
            checkinModal.classList.add('is-hidden');
            yoinPageContent.classList.remove('is-blurred');
        };

        // ページ読み込み時にエリアチェックを実行
        const isInArea = false; // 必ずエリア外になるように設定

        if (isInArea) {
            checkinModal.classList.remove('is-hidden');
            yoinPageContent.classList.add('is-blurred');
        } else {
            guidanceModal.classList.remove('is-hidden');
            yoinPageContent.classList.add('is-blurred');
        }

        // エリア外画像のクリックイベント
        if (guidanceImage) {
            guidanceImage.addEventListener('click', () => {
                guidanceModal.classList.add('is-hidden');
                checkinModal.classList.remove('is-hidden');
            });
        }
        
        // チェックインボタンのクリックイベント
        checkinBtn.addEventListener('click', showPageContent);
    }
});
