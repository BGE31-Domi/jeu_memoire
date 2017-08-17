
var nb_cartes = 6;

var tab = [];

for (var k=1, j=1; j<=nb_cartes; j++){

  tab[j]=k;
  tab[j+1]=k;
  j++;
  k++;

}

  for (var t=1; t<tab.length;t++){
    console.log(tab[t]);
  }
