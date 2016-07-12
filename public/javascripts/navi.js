function navi(id) {
        var nav=document.getElementById("navid" + id);
        if (nav.style.display == 'block') {
          nav.style.display = 'none';
        } else {
          nav.style.display = 'block';
          var dir=(id-(id-1)%378-1)/378+1;
          var page = (id-(id-1)%42-1)/42-(dir-1)*9+1;
          var row = (id-(id-1)%6-1)/6-(dir-1)*9*7-(page-1)*7 +1;
          var pos = id-(dir-1)*9*7*6-(page-1)*7*6-(row-1)*6;
          document.getElementById("dir"+id).innerHTML="Папка №"+dir;
          document.getElementById("page"+id).innerHTML="Лист №"+page;
          document.getElementById("row"+id).innerHTML="Ряд №"+row;
          document.getElementById("pos"+id).innerHTML="Позиция №"+pos;
          var ted=document.getElementById("id"+id+"r"+row+"p"+pos);
          ted.style.backgroundColor = 'red';
        }
      }
