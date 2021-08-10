import React, { useState, useEffect } from 'react';
import './searchFilter.css';
import { Input } from '@material-ui/core';

export default function SearchFilter() {

    const [filter, setFilter] = useState("");
    const [query, setQuery] = useState("");

    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
        var ul, li, a, p, i, txtValue;
        ul = document.getElementById("myUl");
        li = ul.getElementsByClassName("ticketCard");
        if (event.target.value !== "") {
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByClassName("status-container")[0];
                p = a.getElementsByTagName("p")[0];
                txtValue = p.textContent || p.innerText;
                if (event.target.value !== txtValue) {
                    li[i].style.display = "none"
                } else {
                    li[i].style.display = ""
                }
            }
        }
    }

    function searchQuery(event) {
        setQuery(event.target.value)
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

    function defaultTicket() {
        setQuery("");
        setFilter("");
        var ul, li, i;
        ul = document.getElementById("myUl");
        li = ul.getElementsByClassName("ticketCard");
        for (i = 0; i < li.length; i++) {
            li[i].style.display = "";
        }
    }

    useEffect(() => {
        if (document.getElementById("myDIV")) {
            var header = document.getElementById("myDIV");
            var btns = header.getElementsByClassName("bttn");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", defaultTicket);
            }
            // end
        }
    })

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px'
        }}>
            <Input className="input-material-ui"
                style={{
                    color: 'white'
                }}
                type="text"
                id="myInput"
                onChange={searchQuery}
                // onChange={handleQuery}
                placeholder="Search for ticket.."
                title="Type in a name"
                value={query}
            />
            <label style={{ marginLeft: '0.5vw' }}>Filter by : </label>
            <select style={{
                padding: '2px 5px',
                marginLeft: '0.5vw'
            }} onChange={handleChangeFilter} value={filter}>
                <option value="">Status</option>
                <option value="Assigned">Assigned</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Stuck">Stuck</option>
                <option value="Done">Done</option>
            </select>
        </div>
    )
}
