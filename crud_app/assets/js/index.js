const $add = $('#add-user')
const $update = $('#update-user')
const $delete = $('a.delete')

$add.submit((event) => {
    alert('User is saved!')

})

$update.submit((event) => {
    alert('User data is updated!')

})

$delete.click((event) => {
    const id = event.currentTarget.id
    console.log(id)
 
    var req = {
        "url" : 'post/' + id,
        "method" : "DELETE"
    }

    console.log(req.url)
    if(confirm('Delete this user?')) {

        $.ajax(req).done((response) => {
            location.reload()
         
            alert('User removed!')
        })

        .catch((err) => {
            alert(err.message || 'Unexpected Error')
        })


    }
})