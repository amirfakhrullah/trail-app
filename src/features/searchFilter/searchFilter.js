import React from 'react';
import './searchFilter.css';
import { Input } from '@material-ui/core';

export default function SearchFilter() {
    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUl");
        li = ul.getElementsByClassName("ticketCard");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h3")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    return (
        <div>
            <Input className="input-material-ui" style={{color: 'white', marginTop: '20px'}} type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for ticket.." title="Type in a name" />
        </div>
    )
}
