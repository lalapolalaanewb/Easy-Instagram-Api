// number formatter
const socialGet = (() => {

    let numberFormatter = (num) => {

        if(num >= 1000000000){
            return (num/1000000000).toFixed(1).replace(/\.0$/,'') + 'G';
        }
        if(num >= 1000000){
            return (num/1000000).toFixed(1).replace(/\.0$/,'') + 'M';
        }
        if(num >= 1000){
            return (num/1000).toFixed(1).replace(/\.0$/,'') + 'K';
        }
            
        return num;
    }

    let getInsta = () => {

        $.ajax({
            url: 'https://www.instagram.com/hyder_vlad/?__a=1',
            type: 'get',

            success: function(res) {
                
                // number of post
                $('.insta_count_posts').html(numberFormatter(res.graphql.user.edge_owner_to_timeline_media.count))
                // number of followers
                $('.insta_count_followers').html(numberFormatter(res.graphql.user.edge_followed_by.count))
                // numebr of following
                $('.insta_count_following').html(numberFormatter(res.graphql.user.edge_follow.count))

                posts = res.graphql.user.edge_owner_to_timeline_media.edges
                posts_html = ''

                // for(let i = 0; i < 4; i++) {
                for(let i = 0; i < posts.length; i++) {

                    // get post img
                    url = posts[i].node.display_url
                    // get post likes count
                    likes = posts[i].node.edge_liked_by.count
                    // get post comments count 
                    comments = posts[i].node.edge_media_to_comment.count

                    posts_html += `
                    <div class="insta_post" id="post-${i}">
                        <div class="insta_post_img"><img src="${url}"></div>
                        <div class="insta_post_attr">
                            <div><span class="insta_post_likes">${numberFormatter(likes)}</span> likes</div>
                            <div><span class="insta_post_comments">${numberFormatter(comments)}</span> comments</div>
                        </div>
                    </div>
                    `
                }

                $('.posts').html(posts_html)

                console.log('Successful!')
            },

            error: function(xhr, ajaxOptions, thrownError) {
                console.log('Error!')
            }
        })
    }

    return {

        init: () => {

            getInsta()
        }
    }
})();

socialGet.init()