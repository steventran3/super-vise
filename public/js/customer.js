$(document).ready(function(){
    var url = window.location.search;
    var posts;
    
    var nameInput = $("#customer_name");
    var addressInput = $("#address");
    var phoneNumber = $("#phone_number");
    var emailInput = $("#email_input");
    var customerForm = $("#customer_form");
    var tableContainer = $("#customerInfoTable");

    $(document).on("click", ".delete", handlePostDelete);
    
    
    function handlePostDelete(event) {
        var currentPost = $(this)
        .parent()
        .parent()
        .data("Post");
        deletePost(currentPost.id);
    };

    function deletePost(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/customerposts/" + id
        })
        .then(getPosts)
      };
    
    function getPosts() {
        $.get("/api/customerposts", function(data) {
            console.log("Post", data);
            posts = data;
            initializeRows();
            
        });
    };
    
    function createNewRow(postArray){
        var row = $("<tr>");
        row.addClass("addedCustomer");
        row.append("<td>" + postArray.id + "</td>");
        row.append("<td>" + postArray.name + "</td>");
        row.append("<td>" + postArray.address + "</td>");
        row.append("<td>" + postArray.email + "</td>");
        row.append("<td>" + postArray.phone_number + "</td>");
        row.append("<td><a class='waves-effect waves-light btn delete' id='deleteButton'>delete</a></td>")
        // row.append("<td>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</td>");
        row.find("a.delete").data("id", postArray.id);
        row.data("Post", postArray);
        $("#customerInfoTable").prepend(row);
        
    };
    
    function initializeRows() {
        tableContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        // tableContainer.append(postsToAdd);
    }
    
    
    $(customerForm).on("submit", function handleFormSubmit(event){
        event.preventDefault();
        
        // if (!nameInput.val().trim() || !addressInput.val().trim() || !phoneNumber.val().trim() || !emailInput.val().trim()){
        //     return;
        //   };
        
        var newCustomerInfo = {
            name: nameInput.val().trim(),
            address: addressInput.val().trim(),
            phone_number: phoneNumber.val().trim(),
            email: emailInput.val().trim()
        };
        
        console.log(newCustomerInfo);
        
        submitCustomerInfo(newCustomerInfo);
        
        $("#customer_name").val("");
        $("#address").val("");
        $("#email_input").val("");
        $("#phone_number").val("");
        
    });
    
    // Submits a new post and brings user to page after completion
    function submitCustomerInfo(Post){
        $.post("/api/customerposts/", Post, function(){
            window.location.href = "/customer"
            
        })
    };
    
    getPosts();
    
});
// this searches for customer names
function customerSearch() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerInfoTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }