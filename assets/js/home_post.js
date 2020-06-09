{
    //create post using ajax
    let createPost = function(){
        let newPostForm = $('#post-form-new');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post)
                    $('#container-post-list>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    //Dom manipulation using ajax
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                            ${post.content}
                            <br>
                            By ${post.user.name}
                        </p>
                        <div class="comment-post">
                                <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Comment here">
                                    <input type="hidden" name="post" value="${ post._id }">
                                    <input type="submit" value="Add Comment">
                                </form>
                        <div class="comment-list-post">
                            <ul id="comment-post-${ post._id }">
                           
                            </ul>
                        </div>
                    </div>
                </li>`)
    }
    //method to delete from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }





    createPost();
}