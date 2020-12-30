$(() => {
    let title = $('#title')
    let category = $('#category')
    let email = $('#email')
    let author = $('#author')
    let content = $('#content')
    let date = $('#date')
    let btn = $('#btn')
    let blogs = $('#blogs')

    function refreshBlogs() {
        blogs.empty()
        $.get('/blog?mode=json', (data) => {
            blogs.append('<h2>List of Blogs</h2>')
            for (let blog of data) {
                blogs
                    .append(
                        $('<div>')
                            .attr('class', 'blog')
                            .append(
                                `<h3>${blog.title}</h3>
                                <p>Category: ${blog.category}</p>
                                <p>Email: ${blog.email}</p>
                                <p>Posted by: ${blog.author}</p>
                                <p>Content: ${blog.content}</p>
                                <p>Posted on: ${blog.date}</p>`
                            )
                            .append(
                                $('<div>')
                                    .attr('id', 'edit-options')
                                    .append(
                                        $('<button>')
                                            .attr('id', 'up')
                                            .text('⬆')
                                            .click((ev) => {
                                                $(ev.target).parent().insertBefore($(ev.target).parent().prev())
                                            })
                                    )
                                    .append(
                                        $('<button>')
                                            .attr('id', 'down')
                                            .text('⬇')
                                            .click((ev) => {
                                                $(ev.target).parent().insertAfter($(ev.target).parent().next())
                                            })
                                    )
                                    .append(
                                        $('<button>')
                                            .attr('id', 'delete')
                                            .text('❌')
                                            .click((ev) => {
                                                $(ev.target).parent().remove()
                                            })
                                    )
                                    .append(
                                        $('<button>')
                                            .attr('id', 'edit')
                                            .text('✍🏽')
                                    )
                            )
                    )
            }
        })
    }

    refreshBlogs()

    btn.click((ev) => {
        ev.preventDefault()
        $.post(
            '/blog',
            {
                title: title.val(),
                category: category.val(),
                email: email.val(),
                author: author.val(),
                content: content.val(),
                date: date.val(),
                mode: 'json'
            },
            (data) => {
                refreshBlogs()
            }
        )
        title.val('')
        category.val('')
        email.val('')
        author.val('')
        content.val('')
        date.val('')
    })
})