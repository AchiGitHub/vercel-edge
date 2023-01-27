import create from 'zustand';
import { Action, Store } from '../types/store-types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

let useDataStore = create<Store & Action>()(
  devtools(
    persist(
      immer((set) => ({
        match: {
          id: 0,
          name: '',
          match: null,
        },
        selectedTab: 0,
        squad: {
          id: 0,
          name: '',
        },
        interchangeCount: 0,
        startingPlayerList: [],
        // players: [],
        currentQuarter: 1,
        quarters: {
          1: {
            moves: 0,
            bloodRuleInterchange: {},
            concussionInterchange: {},
            selectedBench: [],
            startingSquad: [],
            exceptionalInjuryInterchange: [],
            stretcherInjuryInterchange: [],
            medicalInjuryInterchange: [],
            medicalSubInterchange: [],
          },
        },
        setStartingPlayerLis: (playerList) =>
          set({ startingPlayerList: playerList }),
        setSelectedTab: (tabId) => set({ selectedTab: tabId }),
        setBench: (data) =>
          set((state) => {
            const { benchPlayers, currentQuarter } = data;
            state.quarters[currentQuarter].selectedBench = benchPlayers;
          }),
        setSquad: (data) =>
          set((state) => {
            const { players, currentQuarter } = data;
            state.quarters[currentQuarter].startingSquad = players;
          }),
        setSelectedMatch: (match) =>
          set({
            match: {
              id: match.teamId,
              name: match.side,
              match: match.match,
            },
          }),
        setInterchangeCount: (count) =>
          set({
            interchangeCount: count,
          }),
        addConcussionPlayer: (data) =>
          set((state) => {
            if (data.player) {
              state.quarters[state.currentQuarter].concussionInterchange[
                data.player?.personId
              ] = {
                quarter: state.currentQuarter,
                quarterTime: data.quarterTime,
                timerId: data.timerId,
                personId: data.player.personId,
                time: 0,
                player: data.player,
              };
            }
          }),
        addexceptionalInjuryPlayer: (data) =>
          set((state) => {
            if (data.player) {
              state.quarters[state.currentQuarter].stretcherInjuryInterchange[
                data.player?.personId
              ] = {
                quarter: state.currentQuarter,
                quarterTime: data.quarterTime,
                timerId: data.timerId,
                personId: data.player.personId,
                time: 0,
                player: data.player,
              };
            }
          }),
        addStretcherInjuryPlayer: (data) =>
          set((state) => {
            if (data.player) {
              state.quarters[state.currentQuarter].stretcherInjuryInterchange[
                data.player?.personId
              ] = {
                quarter: state.currentQuarter,
                quarterTime: data.quarterTime,
                timerId: data.timerId,
                personId: data.player.personId,
                time: 0,
                player: data.player,
              };
            }
          }),
        setConcussionPlayerTimer: (data) =>
          set((state) => {
            if (data.playerId) {
              state.quarters[state.currentQuarter].concussionInterchange[
                data.playerId
              ].time = data.time;
            }
          }),
        setexceptionalInjuryPlayerTimer: (data) =>
          set((state) => {
            if (data.playerId) {
              state.quarters[state.currentQuarter].exceptionalInjuryInterchange[
                data.playerId
              ].time = data.time;
            }
          }),
        setstretcherInjuryPlayerTimer: (data) =>
          set((state) => {
            if (data.playerId) {
              state.quarters[state.currentQuarter].stretcherInjuryInterchange[
                data.playerId
              ].time = data.time;
            }
          }),
      })),
      {
        name: 'champion-data',
      }
    )
  )
);

export default useDataStore;
