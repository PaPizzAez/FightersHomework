import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: "Winner",
        bodyElement: `The winner is ${fighter.name}`,
    });
    // call showModal function
}
