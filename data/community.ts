// data/community.ts
export const getCommunityData = async () => {
    // tu pourrais ici faire un vrai fetch plus tard
    return {
      groups: [
        { id: '1', name: 'Les Runners de Lyon' },
        { id: '2', name: 'Marathoniens de Paname' },
      ],
      publications: [
        {
          id: '1',
          title: 'Entraînement collectif ce week-end !',
          content: 'RDV dimanche à 9h au Parc de la Tête d’Or pour un 10K !',
        },
        {
          id: '2',
          title: 'Record personnel battu !',
          content: 'Merci à tous ! Nouveau PR sur 5km 💪',
        },
      ],
    };
  };