import {BehaviorSubject} from 'rxjs';
export const token$ = new BehaviorSubject(window.localStorage.getItem('token'));
export const favorites$ = new BehaviorSubject(JSON.parse(window.localStorage.getItem("favorites") || "[]"));
export const searchQuery$ = new BehaviorSubject("");


export function updateToken(token){
    if (token) {
        window.localStorage.setItem('token', token)
    } else {
        window.localStorage.removeItem('token');
    }
    token$.next(token);
}

export function updateSearchQuery(q) {
  searchQuery$.next(q);
}



export function toggleFavorite(file) {
  let newFavorites = [...favorites$.value];

  if (newFavorites.find(x => x.id === file.id)) {
    newFavorites = newFavorites.filter(x => x.id !== file.id);
  } else {
    newFavorites = [...newFavorites, file];
  }

  if (newFavorites) {
    window.localStorage.setItem("favorites", JSON.stringify(newFavorites));

  } else {
      window.localStorage.removeItem('favorites');
  }

  favorites$.next(newFavorites);
}
