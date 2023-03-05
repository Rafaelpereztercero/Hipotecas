
// Aside menu on-off on barsMenuIcon click
function toggleAsideMenu(action) {
    let barsMenuIcon = document.getElementById('barsMenuIcon');
    let closeMenuIcon = document.getElementById('closeMenuIcon');
    let asideMenu = document.getElementById('asideMenu');

    barsMenuIcon.classList.toggle('xs:hidden');
    closeMenuIcon.classList.toggle('xs:hidden');

    if(action == 'open'){
        asideMenu.classList.remove('-left-[100%]')
        asideMenu.classList.add('left-0')
    }
    else{
        asideMenu.classList.remove('left-0')
        asideMenu.classList.add('-left-[100%]')
    }
};

