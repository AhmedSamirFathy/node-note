

function getID(id) {
    document.getElementById('delete').value = id
}

function edit(id){
    let title = document.getElementById('title'+id).innerText
    let desc = document.getElementById('desc'+id).innerText
    document.getElementById('editedTitle').value = title
    document.getElementById('editedDesc').value = desc
    document.getElementById('_id').value = id


}