import React,  { useEffect, useState} from 'react';
import { favorites$, toggleFavorite} from '../../store';

export default function UploadStarFiles(file) {
  const [favorites , setFavorites] = useState(favorites$.value);
  useEffect(() => {
    const subscription = favorites$.subscribe(setFavorites);

    return () => subscription.unsubscribe();
  });

  function uploadStarFiles(){
    console.log(file);
  }
  return(
    <table className = 'table'>
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th>Fil Namn</th>
                <th>Senaste ändring</th>
                <th>Storlek</th>
                <th></th>
            </tr>
        </thead>
    <tbody>
        {favorites.map(favorite => {
            return (
                    <tr key = {favorite.id}>
                        <td></td>
                        <td></td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
  console.log(favorites);

}
