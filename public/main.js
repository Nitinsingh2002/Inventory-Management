function deleteProduct(id) {
    const result = confirm("Are you sure to delete this product")

    if (result) {
        //caling api from js for deletaion
        fetch('/delete-product/' + id, {
            method: "POST"
        }).then((res) => {
            if (res.ok) {
                //then page reload
                location.reload();
            }
        })
    }
}