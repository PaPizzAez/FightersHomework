import createElement from '../helpers/domHelper';
import fighterService from '../services/fightersService';

export function createFighterPreview(fighter, position) {

    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    if(fighter){
        fighterElement.innerHTML = `
            <div>${fighter.name}</div>
            <div>${fighter.health}</div>
            <div>${fighter.attack}</div>
            <div>${fighter.defense}</div>
            <img src="${fighter.source}">
        `
    }

    console.log(fighter);
    // todo: show fighter info (image, name, health, etc.)

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
