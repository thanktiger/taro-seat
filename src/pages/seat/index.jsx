import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Canvas, Image } from '@tarojs/components'
import './index.scss'
const CELL_WIDTH = 8
const CELL_HEIGHT = 8
const SEAT_WIDTH = 2
const SEAT_HEIGHT = 2
let CANVAS_WIDTH = 0
let CANVAS_HEIGHT = 0
let selectedSeats = {}
let seats = [
  {
      "id": 128060,
      "x": 9,
      "y": 2,
      "rowNo": "1",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128061,
      "x": 10,
      "y": 2,
      "rowNo": "1",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128062,
      "x": 11,
      "y": 2,
      "rowNo": "1",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128063,
      "x": 12,
      "y": 2,
      "rowNo": "1",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128064,
      "x": 13,
      "y": 2,
      "rowNo": "1",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128065,
      "x": 14,
      "y": 2,
      "rowNo": "1",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128066,
      "x": 15,
      "y": 2,
      "rowNo": "1",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128067,
      "x": 19,
      "y": 2,
      "rowNo": "1",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128068,
      "x": 20,
      "y": 2,
      "rowNo": "1",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128069,
      "x": 21,
      "y": 2,
      "rowNo": "1",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128070,
      "x": 22,
      "y": 2,
      "rowNo": "1",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128071,
      "x": 23,
      "y": 2,
      "rowNo": "1",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128072,
      "x": 24,
      "y": 2,
      "rowNo": "1",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128073,
      "x": 25,
      "y": 2,
      "rowNo": "1",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128074,
      "x": 26,
      "y": 2,
      "rowNo": "1",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128075,
      "x": 27,
      "y": 2,
      "rowNo": "1",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128076,
      "x": 28,
      "y": 2,
      "rowNo": "1",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128077,
      "x": 29,
      "y": 2,
      "rowNo": "1",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128078,
      "x": 30,
      "y": 2,
      "rowNo": "1",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128079,
      "x": 33,
      "y": 2,
      "rowNo": "1",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128080,
      "x": 34,
      "y": 2,
      "rowNo": "1",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128081,
      "x": 35,
      "y": 2,
      "rowNo": "1",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128082,
      "x": 36,
      "y": 2,
      "rowNo": "1",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128083,
      "x": 37,
      "y": 2,
      "rowNo": "1",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128084,
      "x": 38,
      "y": 2,
      "rowNo": "1",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128085,
      "x": 8,
      "y": 3,
      "rowNo": "2",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128086,
      "x": 9,
      "y": 3,
      "rowNo": "2",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128087,
      "x": 10,
      "y": 3,
      "rowNo": "2",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128088,
      "x": 11,
      "y": 3,
      "rowNo": "2",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128089,
      "x": 12,
      "y": 3,
      "rowNo": "2",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128090,
      "x": 13,
      "y": 3,
      "rowNo": "2",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128091,
      "x": 14,
      "y": 3,
      "rowNo": "2",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128092,
      "x": 15,
      "y": 3,
      "rowNo": "2",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128093,
      "x": 18,
      "y": 3,
      "rowNo": "2",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128094,
      "x": 19,
      "y": 3,
      "rowNo": "2",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128095,
      "x": 20,
      "y": 3,
      "rowNo": "2",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128096,
      "x": 21,
      "y": 3,
      "rowNo": "2",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128097,
      "x": 22,
      "y": 3,
      "rowNo": "2",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128098,
      "x": 23,
      "y": 3,
      "rowNo": "2",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128099,
      "x": 24,
      "y": 3,
      "rowNo": "2",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128100,
      "x": 25,
      "y": 3,
      "rowNo": "2",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128101,
      "x": 26,
      "y": 3,
      "rowNo": "2",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128102,
      "x": 27,
      "y": 3,
      "rowNo": "2",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128103,
      "x": 28,
      "y": 3,
      "rowNo": "2",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128104,
      "x": 29,
      "y": 3,
      "rowNo": "2",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128105,
      "x": 30,
      "y": 3,
      "rowNo": "2",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128106,
      "x": 34,
      "y": 3,
      "rowNo": "2",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128107,
      "x": 35,
      "y": 3,
      "rowNo": "2",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128108,
      "x": 36,
      "y": 3,
      "rowNo": "2",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128109,
      "x": 37,
      "y": 3,
      "rowNo": "2",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128110,
      "x": 38,
      "y": 3,
      "rowNo": "2",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128111,
      "x": 39,
      "y": 3,
      "rowNo": "2",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128112,
      "x": 40,
      "y": 3,
      "rowNo": "2",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128113,
      "x": 41,
      "y": 3,
      "rowNo": "2",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128114,
      "x": 6,
      "y": 4,
      "rowNo": "3",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128115,
      "x": 7,
      "y": 4,
      "rowNo": "3",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128116,
      "x": 8,
      "y": 4,
      "rowNo": "3",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128117,
      "x": 9,
      "y": 4,
      "rowNo": "3",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128118,
      "x": 10,
      "y": 4,
      "rowNo": "3",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128119,
      "x": 11,
      "y": 4,
      "rowNo": "3",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128120,
      "x": 12,
      "y": 4,
      "rowNo": "3",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128121,
      "x": 13,
      "y": 4,
      "rowNo": "3",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128122,
      "x": 14,
      "y": 4,
      "rowNo": "3",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128123,
      "x": 18,
      "y": 4,
      "rowNo": "3",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128124,
      "x": 19,
      "y": 4,
      "rowNo": "3",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128125,
      "x": 20,
      "y": 4,
      "rowNo": "3",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128126,
      "x": 21,
      "y": 4,
      "rowNo": "3",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128127,
      "x": 22,
      "y": 4,
      "rowNo": "3",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128128,
      "x": 23,
      "y": 4,
      "rowNo": "3",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128129,
      "x": 24,
      "y": 4,
      "rowNo": "3",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128130,
      "x": 25,
      "y": 4,
      "rowNo": "3",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128131,
      "x": 26,
      "y": 4,
      "rowNo": "3",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128132,
      "x": 27,
      "y": 4,
      "rowNo": "3",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128133,
      "x": 28,
      "y": 4,
      "rowNo": "3",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128134,
      "x": 29,
      "y": 4,
      "rowNo": "3",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128135,
      "x": 30,
      "y": 4,
      "rowNo": "3",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128136,
      "x": 31,
      "y": 4,
      "rowNo": "3",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128137,
      "x": 34,
      "y": 4,
      "rowNo": "3",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128138,
      "x": 35,
      "y": 4,
      "rowNo": "3",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128139,
      "x": 36,
      "y": 4,
      "rowNo": "3",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128140,
      "x": 37,
      "y": 4,
      "rowNo": "3",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128141,
      "x": 38,
      "y": 4,
      "rowNo": "3",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128142,
      "x": 39,
      "y": 4,
      "rowNo": "3",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128143,
      "x": 40,
      "y": 4,
      "rowNo": "3",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128144,
      "x": 41,
      "y": 4,
      "rowNo": "3",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128145,
      "x": 42,
      "y": 4,
      "rowNo": "3",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128146,
      "x": 5,
      "y": 5,
      "rowNo": "4",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128147,
      "x": 6,
      "y": 5,
      "rowNo": "4",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128148,
      "x": 7,
      "y": 5,
      "rowNo": "4",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128149,
      "x": 8,
      "y": 5,
      "rowNo": "4",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128150,
      "x": 9,
      "y": 5,
      "rowNo": "4",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128151,
      "x": 10,
      "y": 5,
      "rowNo": "4",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128152,
      "x": 11,
      "y": 5,
      "rowNo": "4",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128153,
      "x": 12,
      "y": 5,
      "rowNo": "4",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128154,
      "x": 13,
      "y": 5,
      "rowNo": "4",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128155,
      "x": 14,
      "y": 5,
      "rowNo": "4",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128156,
      "x": 17,
      "y": 5,
      "rowNo": "4",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128157,
      "x": 18,
      "y": 5,
      "rowNo": "4",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128158,
      "x": 19,
      "y": 5,
      "rowNo": "4",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128159,
      "x": 20,
      "y": 5,
      "rowNo": "4",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128160,
      "x": 21,
      "y": 5,
      "rowNo": "4",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128161,
      "x": 22,
      "y": 5,
      "rowNo": "4",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128162,
      "x": 23,
      "y": 5,
      "rowNo": "4",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128163,
      "x": 24,
      "y": 5,
      "rowNo": "4",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128164,
      "x": 25,
      "y": 5,
      "rowNo": "4",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128165,
      "x": 26,
      "y": 5,
      "rowNo": "4",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128166,
      "x": 27,
      "y": 5,
      "rowNo": "4",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128167,
      "x": 28,
      "y": 5,
      "rowNo": "4",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128168,
      "x": 29,
      "y": 5,
      "rowNo": "4",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128169,
      "x": 30,
      "y": 5,
      "rowNo": "4",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128170,
      "x": 31,
      "y": 5,
      "rowNo": "4",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128171,
      "x": 35,
      "y": 5,
      "rowNo": "4",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128172,
      "x": 36,
      "y": 5,
      "rowNo": "4",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128173,
      "x": 37,
      "y": 5,
      "rowNo": "4",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128174,
      "x": 38,
      "y": 5,
      "rowNo": "4",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128175,
      "x": 39,
      "y": 5,
      "rowNo": "4",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128176,
      "x": 40,
      "y": 5,
      "rowNo": "4",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128177,
      "x": 41,
      "y": 5,
      "rowNo": "4",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128178,
      "x": 42,
      "y": 5,
      "rowNo": "4",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128179,
      "x": 43,
      "y": 5,
      "rowNo": "4",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128180,
      "x": 44,
      "y": 5,
      "rowNo": "4",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128181,
      "x": 3,
      "y": 6,
      "rowNo": "5",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128182,
      "x": 4,
      "y": 6,
      "rowNo": "5",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128183,
      "x": 5,
      "y": 6,
      "rowNo": "5",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128184,
      "x": 6,
      "y": 6,
      "rowNo": "5",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128185,
      "x": 7,
      "y": 6,
      "rowNo": "5",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128186,
      "x": 8,
      "y": 6,
      "rowNo": "5",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128187,
      "x": 9,
      "y": 6,
      "rowNo": "5",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128188,
      "x": 10,
      "y": 6,
      "rowNo": "5",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128189,
      "x": 11,
      "y": 6,
      "rowNo": "5",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128190,
      "x": 12,
      "y": 6,
      "rowNo": "5",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128191,
      "x": 13,
      "y": 6,
      "rowNo": "5",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128192,
      "x": 17,
      "y": 6,
      "rowNo": "5",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128193,
      "x": 18,
      "y": 6,
      "rowNo": "5",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128194,
      "x": 19,
      "y": 6,
      "rowNo": "5",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128195,
      "x": 20,
      "y": 6,
      "rowNo": "5",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128196,
      "x": 21,
      "y": 6,
      "rowNo": "5",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128197,
      "x": 22,
      "y": 6,
      "rowNo": "5",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128198,
      "x": 23,
      "y": 6,
      "rowNo": "5",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128199,
      "x": 24,
      "y": 6,
      "rowNo": "5",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128200,
      "x": 25,
      "y": 6,
      "rowNo": "5",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128201,
      "x": 26,
      "y": 6,
      "rowNo": "5",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128202,
      "x": 27,
      "y": 6,
      "rowNo": "5",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128203,
      "x": 28,
      "y": 6,
      "rowNo": "5",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128204,
      "x": 29,
      "y": 6,
      "rowNo": "5",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128205,
      "x": 30,
      "y": 6,
      "rowNo": "5",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128206,
      "x": 31,
      "y": 6,
      "rowNo": "5",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128207,
      "x": 32,
      "y": 6,
      "rowNo": "5",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128208,
      "x": 35,
      "y": 6,
      "rowNo": "5",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128209,
      "x": 36,
      "y": 6,
      "rowNo": "5",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128210,
      "x": 37,
      "y": 6,
      "rowNo": "5",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128211,
      "x": 38,
      "y": 6,
      "rowNo": "5",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128212,
      "x": 39,
      "y": 6,
      "rowNo": "5",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128213,
      "x": 40,
      "y": 6,
      "rowNo": "5",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128214,
      "x": 41,
      "y": 6,
      "rowNo": "5",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128215,
      "x": 42,
      "y": 6,
      "rowNo": "5",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128216,
      "x": 43,
      "y": 6,
      "rowNo": "5",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128217,
      "x": 44,
      "y": 6,
      "rowNo": "5",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128218,
      "x": 45,
      "y": 6,
      "rowNo": "5",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128219,
      "x": 4,
      "y": 7,
      "rowNo": "6",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128220,
      "x": 5,
      "y": 7,
      "rowNo": "6",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128221,
      "x": 6,
      "y": 7,
      "rowNo": "6",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128222,
      "x": 7,
      "y": 7,
      "rowNo": "6",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128223,
      "x": 8,
      "y": 7,
      "rowNo": "6",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128224,
      "x": 9,
      "y": 7,
      "rowNo": "6",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128225,
      "x": 10,
      "y": 7,
      "rowNo": "6",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128226,
      "x": 11,
      "y": 7,
      "rowNo": "6",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128227,
      "x": 12,
      "y": 7,
      "rowNo": "6",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128228,
      "x": 13,
      "y": 7,
      "rowNo": "6",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128229,
      "x": 16,
      "y": 7,
      "rowNo": "6",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128230,
      "x": 17,
      "y": 7,
      "rowNo": "6",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128231,
      "x": 18,
      "y": 7,
      "rowNo": "6",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128232,
      "x": 19,
      "y": 7,
      "rowNo": "6",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128233,
      "x": 20,
      "y": 7,
      "rowNo": "6",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128234,
      "x": 21,
      "y": 7,
      "rowNo": "6",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128235,
      "x": 22,
      "y": 7,
      "rowNo": "6",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128236,
      "x": 23,
      "y": 7,
      "rowNo": "6",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128237,
      "x": 24,
      "y": 7,
      "rowNo": "6",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128238,
      "x": 25,
      "y": 7,
      "rowNo": "6",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128239,
      "x": 26,
      "y": 7,
      "rowNo": "6",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128240,
      "x": 27,
      "y": 7,
      "rowNo": "6",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128241,
      "x": 28,
      "y": 7,
      "rowNo": "6",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128242,
      "x": 29,
      "y": 7,
      "rowNo": "6",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128243,
      "x": 30,
      "y": 7,
      "rowNo": "6",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128244,
      "x": 31,
      "y": 7,
      "rowNo": "6",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128245,
      "x": 32,
      "y": 7,
      "rowNo": "6",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128246,
      "x": 35,
      "y": 7,
      "rowNo": "6",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128247,
      "x": 36,
      "y": 7,
      "rowNo": "6",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128248,
      "x": 37,
      "y": 7,
      "rowNo": "6",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128249,
      "x": 38,
      "y": 7,
      "rowNo": "6",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128250,
      "x": 39,
      "y": 7,
      "rowNo": "6",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128251,
      "x": 40,
      "y": 7,
      "rowNo": "6",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128252,
      "x": 41,
      "y": 7,
      "rowNo": "6",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128253,
      "x": 42,
      "y": 7,
      "rowNo": "6",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128254,
      "x": 43,
      "y": 7,
      "rowNo": "6",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128255,
      "x": 44,
      "y": 7,
      "rowNo": "6",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128256,
      "x": 4,
      "y": 8,
      "rowNo": "7",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128257,
      "x": 5,
      "y": 8,
      "rowNo": "7",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128258,
      "x": 6,
      "y": 8,
      "rowNo": "7",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128259,
      "x": 7,
      "y": 8,
      "rowNo": "7",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128260,
      "x": 8,
      "y": 8,
      "rowNo": "7",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128261,
      "x": 9,
      "y": 8,
      "rowNo": "7",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128262,
      "x": 10,
      "y": 8,
      "rowNo": "7",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128263,
      "x": 11,
      "y": 8,
      "rowNo": "7",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128264,
      "x": 12,
      "y": 8,
      "rowNo": "7",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128265,
      "x": 16,
      "y": 8,
      "rowNo": "7",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128266,
      "x": 17,
      "y": 8,
      "rowNo": "7",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128267,
      "x": 18,
      "y": 8,
      "rowNo": "7",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128268,
      "x": 19,
      "y": 8,
      "rowNo": "7",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128269,
      "x": 20,
      "y": 8,
      "rowNo": "7",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128270,
      "x": 21,
      "y": 8,
      "rowNo": "7",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128271,
      "x": 22,
      "y": 8,
      "rowNo": "7",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128272,
      "x": 23,
      "y": 8,
      "rowNo": "7",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128273,
      "x": 24,
      "y": 8,
      "rowNo": "7",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128274,
      "x": 25,
      "y": 8,
      "rowNo": "7",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128275,
      "x": 26,
      "y": 8,
      "rowNo": "7",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128276,
      "x": 27,
      "y": 8,
      "rowNo": "7",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128277,
      "x": 28,
      "y": 8,
      "rowNo": "7",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128278,
      "x": 29,
      "y": 8,
      "rowNo": "7",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128279,
      "x": 30,
      "y": 8,
      "rowNo": "7",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128280,
      "x": 31,
      "y": 8,
      "rowNo": "7",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128281,
      "x": 32,
      "y": 8,
      "rowNo": "7",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128282,
      "x": 33,
      "y": 8,
      "rowNo": "7",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128283,
      "x": 35,
      "y": 8,
      "rowNo": "7",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128284,
      "x": 36,
      "y": 8,
      "rowNo": "7",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128285,
      "x": 37,
      "y": 8,
      "rowNo": "7",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128286,
      "x": 38,
      "y": 8,
      "rowNo": "7",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128287,
      "x": 39,
      "y": 8,
      "rowNo": "7",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128288,
      "x": 40,
      "y": 8,
      "rowNo": "7",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128289,
      "x": 41,
      "y": 8,
      "rowNo": "7",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128290,
      "x": 42,
      "y": 8,
      "rowNo": "7",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128291,
      "x": 43,
      "y": 8,
      "rowNo": "7",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128292,
      "x": 5,
      "y": 9,
      "rowNo": "8",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128293,
      "x": 6,
      "y": 9,
      "rowNo": "8",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128294,
      "x": 7,
      "y": 9,
      "rowNo": "8",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128295,
      "x": 8,
      "y": 9,
      "rowNo": "8",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128296,
      "x": 9,
      "y": 9,
      "rowNo": "8",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128297,
      "x": 10,
      "y": 9,
      "rowNo": "8",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128298,
      "x": 11,
      "y": 9,
      "rowNo": "8",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128299,
      "x": 12,
      "y": 9,
      "rowNo": "8",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128300,
      "x": 15,
      "y": 9,
      "rowNo": "8",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128301,
      "x": 16,
      "y": 9,
      "rowNo": "8",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128302,
      "x": 17,
      "y": 9,
      "rowNo": "8",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128303,
      "x": 18,
      "y": 9,
      "rowNo": "8",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128304,
      "x": 19,
      "y": 9,
      "rowNo": "8",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128305,
      "x": 20,
      "y": 9,
      "rowNo": "8",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128306,
      "x": 21,
      "y": 9,
      "rowNo": "8",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128307,
      "x": 22,
      "y": 9,
      "rowNo": "8",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128308,
      "x": 23,
      "y": 9,
      "rowNo": "8",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128309,
      "x": 24,
      "y": 9,
      "rowNo": "8",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128310,
      "x": 25,
      "y": 9,
      "rowNo": "8",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128311,
      "x": 26,
      "y": 9,
      "rowNo": "8",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128312,
      "x": 27,
      "y": 9,
      "rowNo": "8",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128313,
      "x": 28,
      "y": 9,
      "rowNo": "8",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128314,
      "x": 29,
      "y": 9,
      "rowNo": "8",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128315,
      "x": 30,
      "y": 9,
      "rowNo": "8",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128316,
      "x": 31,
      "y": 9,
      "rowNo": "8",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128317,
      "x": 32,
      "y": 9,
      "rowNo": "8",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128318,
      "x": 33,
      "y": 9,
      "rowNo": "8",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128319,
      "x": 36,
      "y": 9,
      "rowNo": "8",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128320,
      "x": 37,
      "y": 9,
      "rowNo": "8",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128321,
      "x": 38,
      "y": 9,
      "rowNo": "8",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128322,
      "x": 39,
      "y": 9,
      "rowNo": "8",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128323,
      "x": 40,
      "y": 9,
      "rowNo": "8",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128324,
      "x": 41,
      "y": 9,
      "rowNo": "8",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128325,
      "x": 42,
      "y": 9,
      "rowNo": "8",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128326,
      "x": 43,
      "y": 9,
      "rowNo": "8",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128327,
      "x": 44,
      "y": 9,
      "rowNo": "8",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128328,
      "x": 6,
      "y": 10,
      "rowNo": "9",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128329,
      "x": 7,
      "y": 10,
      "rowNo": "9",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128330,
      "x": 8,
      "y": 10,
      "rowNo": "9",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128331,
      "x": 9,
      "y": 10,
      "rowNo": "9",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128332,
      "x": 10,
      "y": 10,
      "rowNo": "9",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128333,
      "x": 11,
      "y": 10,
      "rowNo": "9",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128334,
      "x": 12,
      "y": 10,
      "rowNo": "9",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128335,
      "x": 15,
      "y": 10,
      "rowNo": "9",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128336,
      "x": 16,
      "y": 10,
      "rowNo": "9",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128337,
      "x": 17,
      "y": 10,
      "rowNo": "9",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128338,
      "x": 18,
      "y": 10,
      "rowNo": "9",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128339,
      "x": 19,
      "y": 10,
      "rowNo": "9",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128340,
      "x": 20,
      "y": 10,
      "rowNo": "9",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128341,
      "x": 21,
      "y": 10,
      "rowNo": "9",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128342,
      "x": 22,
      "y": 10,
      "rowNo": "9",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128343,
      "x": 23,
      "y": 10,
      "rowNo": "9",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128344,
      "x": 24,
      "y": 10,
      "rowNo": "9",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128345,
      "x": 25,
      "y": 10,
      "rowNo": "9",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128346,
      "x": 26,
      "y": 10,
      "rowNo": "9",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128347,
      "x": 27,
      "y": 10,
      "rowNo": "9",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128348,
      "x": 28,
      "y": 10,
      "rowNo": "9",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128349,
      "x": 29,
      "y": 10,
      "rowNo": "9",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128350,
      "x": 30,
      "y": 10,
      "rowNo": "9",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128351,
      "x": 31,
      "y": 10,
      "rowNo": "9",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128352,
      "x": 32,
      "y": 10,
      "rowNo": "9",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128353,
      "x": 33,
      "y": 10,
      "rowNo": "9",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128354,
      "x": 34,
      "y": 10,
      "rowNo": "9",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128355,
      "x": 37,
      "y": 10,
      "rowNo": "9",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128356,
      "x": 38,
      "y": 10,
      "rowNo": "9",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128357,
      "x": 39,
      "y": 10,
      "rowNo": "9",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128358,
      "x": 40,
      "y": 10,
      "rowNo": "9",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128359,
      "x": 41,
      "y": 10,
      "rowNo": "9",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128360,
      "x": 42,
      "y": 10,
      "rowNo": "9",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128361,
      "x": 43,
      "y": 10,
      "rowNo": "9",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128362,
      "x": 44,
      "y": 10,
      "rowNo": "9",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128363,
      "x": 45,
      "y": 10,
      "rowNo": "9",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128364,
      "x": 5,
      "y": 11,
      "rowNo": "10",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128365,
      "x": 6,
      "y": 11,
      "rowNo": "10",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128366,
      "x": 7,
      "y": 11,
      "rowNo": "10",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128367,
      "x": 8,
      "y": 11,
      "rowNo": "10",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128368,
      "x": 9,
      "y": 11,
      "rowNo": "10",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128369,
      "x": 10,
      "y": 11,
      "rowNo": "10",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128370,
      "x": 11,
      "y": 11,
      "rowNo": "10",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128371,
      "x": 14,
      "y": 11,
      "rowNo": "10",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128372,
      "x": 15,
      "y": 11,
      "rowNo": "10",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128373,
      "x": 16,
      "y": 11,
      "rowNo": "10",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128374,
      "x": 17,
      "y": 11,
      "rowNo": "10",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128375,
      "x": 18,
      "y": 11,
      "rowNo": "10",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128376,
      "x": 19,
      "y": 11,
      "rowNo": "10",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128377,
      "x": 20,
      "y": 11,
      "rowNo": "10",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128378,
      "x": 21,
      "y": 11,
      "rowNo": "10",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128379,
      "x": 22,
      "y": 11,
      "rowNo": "10",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128380,
      "x": 23,
      "y": 11,
      "rowNo": "10",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128381,
      "x": 24,
      "y": 11,
      "rowNo": "10",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128382,
      "x": 25,
      "y": 11,
      "rowNo": "10",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128383,
      "x": 26,
      "y": 11,
      "rowNo": "10",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128384,
      "x": 27,
      "y": 11,
      "rowNo": "10",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128385,
      "x": 28,
      "y": 11,
      "rowNo": "10",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128386,
      "x": 29,
      "y": 11,
      "rowNo": "10",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128387,
      "x": 30,
      "y": 11,
      "rowNo": "10",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128388,
      "x": 31,
      "y": 11,
      "rowNo": "10",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128389,
      "x": 32,
      "y": 11,
      "rowNo": "10",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128390,
      "x": 33,
      "y": 11,
      "rowNo": "10",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128391,
      "x": 34,
      "y": 11,
      "rowNo": "10",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128392,
      "x": 37,
      "y": 11,
      "rowNo": "10",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128393,
      "x": 38,
      "y": 11,
      "rowNo": "10",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128394,
      "x": 39,
      "y": 11,
      "rowNo": "10",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128395,
      "x": 40,
      "y": 11,
      "rowNo": "10",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128396,
      "x": 41,
      "y": 11,
      "rowNo": "10",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128397,
      "x": 42,
      "y": 11,
      "rowNo": "10",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128398,
      "x": 43,
      "y": 11,
      "rowNo": "10",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128399,
      "x": 44,
      "y": 11,
      "rowNo": "10",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128400,
      "x": 45,
      "y": 11,
      "rowNo": "10",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128401,
      "x": 46,
      "y": 11,
      "rowNo": "10",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128402,
      "x": 6,
      "y": 12,
      "rowNo": "11",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128403,
      "x": 7,
      "y": 12,
      "rowNo": "11",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128404,
      "x": 8,
      "y": 12,
      "rowNo": "11",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128405,
      "x": 9,
      "y": 12,
      "rowNo": "11",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128406,
      "x": 10,
      "y": 12,
      "rowNo": "11",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128407,
      "x": 11,
      "y": 12,
      "rowNo": "11",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128408,
      "x": 14,
      "y": 12,
      "rowNo": "11",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128409,
      "x": 15,
      "y": 12,
      "rowNo": "11",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128410,
      "x": 16,
      "y": 12,
      "rowNo": "11",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128411,
      "x": 17,
      "y": 12,
      "rowNo": "11",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128412,
      "x": 18,
      "y": 12,
      "rowNo": "11",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128413,
      "x": 19,
      "y": 12,
      "rowNo": "11",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128414,
      "x": 20,
      "y": 12,
      "rowNo": "11",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128415,
      "x": 21,
      "y": 12,
      "rowNo": "11",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128416,
      "x": 22,
      "y": 12,
      "rowNo": "11",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128417,
      "x": 23,
      "y": 12,
      "rowNo": "11",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128418,
      "x": 24,
      "y": 12,
      "rowNo": "11",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128419,
      "x": 25,
      "y": 12,
      "rowNo": "11",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128420,
      "x": 26,
      "y": 12,
      "rowNo": "11",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128421,
      "x": 27,
      "y": 12,
      "rowNo": "11",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128422,
      "x": 28,
      "y": 12,
      "rowNo": "11",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128423,
      "x": 29,
      "y": 12,
      "rowNo": "11",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128424,
      "x": 30,
      "y": 12,
      "rowNo": "11",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128425,
      "x": 31,
      "y": 12,
      "rowNo": "11",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128426,
      "x": 32,
      "y": 12,
      "rowNo": "11",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128427,
      "x": 33,
      "y": 12,
      "rowNo": "11",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128428,
      "x": 34,
      "y": 12,
      "rowNo": "11",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128429,
      "x": 35,
      "y": 12,
      "rowNo": "11",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128430,
      "x": 38,
      "y": 12,
      "rowNo": "11",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128431,
      "x": 39,
      "y": 12,
      "rowNo": "11",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128432,
      "x": 40,
      "y": 12,
      "rowNo": "11",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128433,
      "x": 41,
      "y": 12,
      "rowNo": "11",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128434,
      "x": 42,
      "y": 12,
      "rowNo": "11",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128435,
      "x": 43,
      "y": 12,
      "rowNo": "11",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128436,
      "x": 44,
      "y": 12,
      "rowNo": "11",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128437,
      "x": 45,
      "y": 12,
      "rowNo": "11",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128438,
      "x": 46,
      "y": 12,
      "rowNo": "11",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128439,
      "x": 47,
      "y": 12,
      "rowNo": "11",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128440,
      "x": 5,
      "y": 13,
      "rowNo": "12",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128441,
      "x": 6,
      "y": 13,
      "rowNo": "12",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128442,
      "x": 7,
      "y": 13,
      "rowNo": "12",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128443,
      "x": 8,
      "y": 13,
      "rowNo": "12",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128444,
      "x": 9,
      "y": 13,
      "rowNo": "12",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128445,
      "x": 10,
      "y": 13,
      "rowNo": "12",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128446,
      "x": 11,
      "y": 13,
      "rowNo": "12",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128447,
      "x": 14,
      "y": 13,
      "rowNo": "12",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128448,
      "x": 15,
      "y": 13,
      "rowNo": "12",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128449,
      "x": 16,
      "y": 13,
      "rowNo": "12",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128450,
      "x": 17,
      "y": 13,
      "rowNo": "12",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128451,
      "x": 18,
      "y": 13,
      "rowNo": "12",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128452,
      "x": 19,
      "y": 13,
      "rowNo": "12",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128453,
      "x": 20,
      "y": 13,
      "rowNo": "12",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128454,
      "x": 21,
      "y": 13,
      "rowNo": "12",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128455,
      "x": 22,
      "y": 13,
      "rowNo": "12",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128456,
      "x": 23,
      "y": 13,
      "rowNo": "12",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128457,
      "x": 24,
      "y": 13,
      "rowNo": "12",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128458,
      "x": 25,
      "y": 13,
      "rowNo": "12",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128459,
      "x": 26,
      "y": 13,
      "rowNo": "12",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128460,
      "x": 27,
      "y": 13,
      "rowNo": "12",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128461,
      "x": 28,
      "y": 13,
      "rowNo": "12",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128462,
      "x": 29,
      "y": 13,
      "rowNo": "12",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128463,
      "x": 30,
      "y": 13,
      "rowNo": "12",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128464,
      "x": 31,
      "y": 13,
      "rowNo": "12",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128465,
      "x": 32,
      "y": 13,
      "rowNo": "12",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128466,
      "x": 33,
      "y": 13,
      "rowNo": "12",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128467,
      "x": 34,
      "y": 13,
      "rowNo": "12",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128468,
      "x": 35,
      "y": 13,
      "rowNo": "12",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128469,
      "x": 38,
      "y": 13,
      "rowNo": "12",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128470,
      "x": 39,
      "y": 13,
      "rowNo": "12",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128471,
      "x": 40,
      "y": 13,
      "rowNo": "12",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128472,
      "x": 41,
      "y": 13,
      "rowNo": "12",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128473,
      "x": 42,
      "y": 13,
      "rowNo": "12",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128474,
      "x": 43,
      "y": 13,
      "rowNo": "12",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128475,
      "x": 44,
      "y": 13,
      "rowNo": "12",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128476,
      "x": 45,
      "y": 13,
      "rowNo": "12",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128477,
      "x": 46,
      "y": 13,
      "rowNo": "12",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128478,
      "x": 47,
      "y": 13,
      "rowNo": "12",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128479,
      "x": 48,
      "y": 13,
      "rowNo": "12",
      "colNo": "44",
      "venueAreaId": 680
  },
  {
      "id": 128480,
      "x": 4,
      "y": 14,
      "rowNo": "13",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128481,
      "x": 5,
      "y": 14,
      "rowNo": "13",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128482,
      "x": 6,
      "y": 14,
      "rowNo": "13",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128483,
      "x": 7,
      "y": 14,
      "rowNo": "13",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128484,
      "x": 8,
      "y": 14,
      "rowNo": "13",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128485,
      "x": 9,
      "y": 14,
      "rowNo": "13",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128486,
      "x": 10,
      "y": 14,
      "rowNo": "13",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128487,
      "x": 11,
      "y": 14,
      "rowNo": "13",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128488,
      "x": 14,
      "y": 14,
      "rowNo": "13",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128489,
      "x": 15,
      "y": 14,
      "rowNo": "13",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128490,
      "x": 16,
      "y": 14,
      "rowNo": "13",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128491,
      "x": 17,
      "y": 14,
      "rowNo": "13",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128492,
      "x": 18,
      "y": 14,
      "rowNo": "13",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128493,
      "x": 19,
      "y": 14,
      "rowNo": "13",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128494,
      "x": 20,
      "y": 14,
      "rowNo": "13",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128495,
      "x": 21,
      "y": 14,
      "rowNo": "13",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128496,
      "x": 22,
      "y": 14,
      "rowNo": "13",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128497,
      "x": 23,
      "y": 14,
      "rowNo": "13",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128498,
      "x": 24,
      "y": 14,
      "rowNo": "13",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128499,
      "x": 25,
      "y": 14,
      "rowNo": "13",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128500,
      "x": 26,
      "y": 14,
      "rowNo": "13",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128501,
      "x": 27,
      "y": 14,
      "rowNo": "13",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128502,
      "x": 28,
      "y": 14,
      "rowNo": "13",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128503,
      "x": 29,
      "y": 14,
      "rowNo": "13",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128504,
      "x": 30,
      "y": 14,
      "rowNo": "13",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128505,
      "x": 31,
      "y": 14,
      "rowNo": "13",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128506,
      "x": 32,
      "y": 14,
      "rowNo": "13",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128507,
      "x": 33,
      "y": 14,
      "rowNo": "13",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128508,
      "x": 34,
      "y": 14,
      "rowNo": "13",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128509,
      "x": 35,
      "y": 14,
      "rowNo": "13",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128510,
      "x": 38,
      "y": 14,
      "rowNo": "13",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128511,
      "x": 39,
      "y": 14,
      "rowNo": "13",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128512,
      "x": 40,
      "y": 14,
      "rowNo": "13",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128513,
      "x": 41,
      "y": 14,
      "rowNo": "13",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128514,
      "x": 42,
      "y": 14,
      "rowNo": "13",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128515,
      "x": 43,
      "y": 14,
      "rowNo": "13",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128516,
      "x": 44,
      "y": 14,
      "rowNo": "13",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128517,
      "x": 45,
      "y": 14,
      "rowNo": "13",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128518,
      "x": 46,
      "y": 14,
      "rowNo": "13",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128519,
      "x": 47,
      "y": 14,
      "rowNo": "13",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128520,
      "x": 48,
      "y": 14,
      "rowNo": "13",
      "colNo": "44",
      "venueAreaId": 680
  },
  {
      "id": 128521,
      "x": 3,
      "y": 15,
      "rowNo": "14",
      "colNo": "39",
      "venueAreaId": 680
  },
  {
      "id": 128522,
      "x": 4,
      "y": 15,
      "rowNo": "14",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128523,
      "x": 5,
      "y": 15,
      "rowNo": "14",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128524,
      "x": 6,
      "y": 15,
      "rowNo": "14",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128525,
      "x": 7,
      "y": 15,
      "rowNo": "14",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128526,
      "x": 8,
      "y": 15,
      "rowNo": "14",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128527,
      "x": 9,
      "y": 15,
      "rowNo": "14",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128528,
      "x": 10,
      "y": 15,
      "rowNo": "14",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128529,
      "x": 11,
      "y": 15,
      "rowNo": "14",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128530,
      "x": 14,
      "y": 15,
      "rowNo": "14",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128531,
      "x": 15,
      "y": 15,
      "rowNo": "14",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128532,
      "x": 16,
      "y": 15,
      "rowNo": "14",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128533,
      "x": 17,
      "y": 15,
      "rowNo": "14",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128534,
      "x": 18,
      "y": 15,
      "rowNo": "14",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128535,
      "x": 19,
      "y": 15,
      "rowNo": "14",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128536,
      "x": 20,
      "y": 15,
      "rowNo": "14",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128537,
      "x": 21,
      "y": 15,
      "rowNo": "14",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128538,
      "x": 22,
      "y": 15,
      "rowNo": "14",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128539,
      "x": 23,
      "y": 15,
      "rowNo": "14",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128540,
      "x": 24,
      "y": 15,
      "rowNo": "14",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128541,
      "x": 25,
      "y": 15,
      "rowNo": "14",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128542,
      "x": 26,
      "y": 15,
      "rowNo": "14",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128543,
      "x": 27,
      "y": 15,
      "rowNo": "14",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128544,
      "x": 28,
      "y": 15,
      "rowNo": "14",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128545,
      "x": 29,
      "y": 15,
      "rowNo": "14",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128546,
      "x": 30,
      "y": 15,
      "rowNo": "14",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128547,
      "x": 31,
      "y": 15,
      "rowNo": "14",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128548,
      "x": 32,
      "y": 15,
      "rowNo": "14",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128549,
      "x": 33,
      "y": 15,
      "rowNo": "14",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128550,
      "x": 34,
      "y": 15,
      "rowNo": "14",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128551,
      "x": 35,
      "y": 15,
      "rowNo": "14",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128552,
      "x": 38,
      "y": 15,
      "rowNo": "14",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128553,
      "x": 39,
      "y": 15,
      "rowNo": "14",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128554,
      "x": 40,
      "y": 15,
      "rowNo": "14",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128555,
      "x": 41,
      "y": 15,
      "rowNo": "14",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128556,
      "x": 42,
      "y": 15,
      "rowNo": "14",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128557,
      "x": 43,
      "y": 15,
      "rowNo": "14",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128558,
      "x": 44,
      "y": 15,
      "rowNo": "14",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128559,
      "x": 45,
      "y": 15,
      "rowNo": "14",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128560,
      "x": 46,
      "y": 15,
      "rowNo": "14",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128561,
      "x": 47,
      "y": 15,
      "rowNo": "14",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128562,
      "x": 48,
      "y": 15,
      "rowNo": "14",
      "colNo": "44",
      "venueAreaId": 680
  },
  {
      "id": 128563,
      "x": 2,
      "y": 16,
      "rowNo": "15",
      "colNo": "41",
      "venueAreaId": 680
  },
  {
      "id": 128564,
      "x": 3,
      "y": 16,
      "rowNo": "15",
      "colNo": "39",
      "venueAreaId": 680
  },
  {
      "id": 128565,
      "x": 4,
      "y": 16,
      "rowNo": "15",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128566,
      "x": 5,
      "y": 16,
      "rowNo": "15",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128567,
      "x": 6,
      "y": 16,
      "rowNo": "15",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128568,
      "x": 7,
      "y": 16,
      "rowNo": "15",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128569,
      "x": 8,
      "y": 16,
      "rowNo": "15",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128570,
      "x": 9,
      "y": 16,
      "rowNo": "15",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128571,
      "x": 10,
      "y": 16,
      "rowNo": "15",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128572,
      "x": 11,
      "y": 16,
      "rowNo": "15",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128573,
      "x": 14,
      "y": 16,
      "rowNo": "15",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128574,
      "x": 15,
      "y": 16,
      "rowNo": "15",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128575,
      "x": 16,
      "y": 16,
      "rowNo": "15",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128576,
      "x": 17,
      "y": 16,
      "rowNo": "15",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128577,
      "x": 18,
      "y": 16,
      "rowNo": "15",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128578,
      "x": 19,
      "y": 16,
      "rowNo": "15",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128579,
      "x": 20,
      "y": 16,
      "rowNo": "15",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128580,
      "x": 21,
      "y": 16,
      "rowNo": "15",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128581,
      "x": 22,
      "y": 16,
      "rowNo": "15",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128582,
      "x": 23,
      "y": 16,
      "rowNo": "15",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128583,
      "x": 24,
      "y": 16,
      "rowNo": "15",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128584,
      "x": 25,
      "y": 16,
      "rowNo": "15",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128585,
      "x": 26,
      "y": 16,
      "rowNo": "15",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128586,
      "x": 27,
      "y": 16,
      "rowNo": "15",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128587,
      "x": 28,
      "y": 16,
      "rowNo": "15",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128588,
      "x": 29,
      "y": 16,
      "rowNo": "15",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128589,
      "x": 30,
      "y": 16,
      "rowNo": "15",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128590,
      "x": 31,
      "y": 16,
      "rowNo": "15",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128591,
      "x": 32,
      "y": 16,
      "rowNo": "15",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128592,
      "x": 33,
      "y": 16,
      "rowNo": "15",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128593,
      "x": 34,
      "y": 16,
      "rowNo": "15",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128594,
      "x": 35,
      "y": 16,
      "rowNo": "15",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128595,
      "x": 38,
      "y": 16,
      "rowNo": "15",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128596,
      "x": 39,
      "y": 16,
      "rowNo": "15",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128597,
      "x": 40,
      "y": 16,
      "rowNo": "15",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128598,
      "x": 41,
      "y": 16,
      "rowNo": "15",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128599,
      "x": 42,
      "y": 16,
      "rowNo": "15",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128600,
      "x": 43,
      "y": 16,
      "rowNo": "15",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128601,
      "x": 44,
      "y": 16,
      "rowNo": "15",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128602,
      "x": 45,
      "y": 16,
      "rowNo": "15",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128603,
      "x": 46,
      "y": 16,
      "rowNo": "15",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128604,
      "x": 47,
      "y": 16,
      "rowNo": "15",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128605,
      "x": 48,
      "y": 16,
      "rowNo": "15",
      "colNo": "44",
      "venueAreaId": 680
  },
  {
      "id": 128606,
      "x": 2,
      "y": 17,
      "rowNo": "16",
      "colNo": "41",
      "venueAreaId": 680
  },
  {
      "id": 128607,
      "x": 3,
      "y": 17,
      "rowNo": "16",
      "colNo": "39",
      "venueAreaId": 680
  },
  {
      "id": 128608,
      "x": 4,
      "y": 17,
      "rowNo": "16",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128609,
      "x": 5,
      "y": 17,
      "rowNo": "16",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128610,
      "x": 6,
      "y": 17,
      "rowNo": "16",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128611,
      "x": 7,
      "y": 17,
      "rowNo": "16",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128612,
      "x": 8,
      "y": 17,
      "rowNo": "16",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128613,
      "x": 9,
      "y": 17,
      "rowNo": "16",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128614,
      "x": 10,
      "y": 17,
      "rowNo": "16",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128615,
      "x": 11,
      "y": 17,
      "rowNo": "16",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128616,
      "x": 14,
      "y": 17,
      "rowNo": "16",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128617,
      "x": 15,
      "y": 17,
      "rowNo": "16",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128618,
      "x": 16,
      "y": 17,
      "rowNo": "16",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128619,
      "x": 17,
      "y": 17,
      "rowNo": "16",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128620,
      "x": 18,
      "y": 17,
      "rowNo": "16",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128621,
      "x": 19,
      "y": 17,
      "rowNo": "16",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128622,
      "x": 20,
      "y": 17,
      "rowNo": "16",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128623,
      "x": 21,
      "y": 17,
      "rowNo": "16",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128624,
      "x": 22,
      "y": 17,
      "rowNo": "16",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128625,
      "x": 23,
      "y": 17,
      "rowNo": "16",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128626,
      "x": 24,
      "y": 17,
      "rowNo": "16",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128627,
      "x": 25,
      "y": 17,
      "rowNo": "16",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128628,
      "x": 26,
      "y": 17,
      "rowNo": "16",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128629,
      "x": 27,
      "y": 17,
      "rowNo": "16",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128630,
      "x": 28,
      "y": 17,
      "rowNo": "16",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128631,
      "x": 29,
      "y": 17,
      "rowNo": "16",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128632,
      "x": 30,
      "y": 17,
      "rowNo": "16",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128633,
      "x": 31,
      "y": 17,
      "rowNo": "16",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128634,
      "x": 32,
      "y": 17,
      "rowNo": "16",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128635,
      "x": 33,
      "y": 17,
      "rowNo": "16",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128636,
      "x": 34,
      "y": 17,
      "rowNo": "16",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128637,
      "x": 35,
      "y": 17,
      "rowNo": "16",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128638,
      "x": 38,
      "y": 17,
      "rowNo": "16",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128639,
      "x": 39,
      "y": 17,
      "rowNo": "16",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128640,
      "x": 40,
      "y": 17,
      "rowNo": "16",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128641,
      "x": 41,
      "y": 17,
      "rowNo": "16",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128642,
      "x": 42,
      "y": 17,
      "rowNo": "16",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128643,
      "x": 43,
      "y": 17,
      "rowNo": "16",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128644,
      "x": 44,
      "y": 17,
      "rowNo": "16",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128645,
      "x": 45,
      "y": 17,
      "rowNo": "16",
      "colNo": "38",
      "venueAreaId": 680
  },
  {
      "id": 128646,
      "x": 46,
      "y": 17,
      "rowNo": "16",
      "colNo": "40",
      "venueAreaId": 680
  },
  {
      "id": 128647,
      "x": 47,
      "y": 17,
      "rowNo": "16",
      "colNo": "42",
      "venueAreaId": 680
  },
  {
      "id": 128648,
      "x": 5,
      "y": 19,
      "rowNo": "17",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128649,
      "x": 6,
      "y": 19,
      "rowNo": "17",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128650,
      "x": 7,
      "y": 19,
      "rowNo": "17",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128651,
      "x": 8,
      "y": 19,
      "rowNo": "17",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128652,
      "x": 9,
      "y": 19,
      "rowNo": "17",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128653,
      "x": 10,
      "y": 19,
      "rowNo": "17",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128654,
      "x": 11,
      "y": 19,
      "rowNo": "17",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128655,
      "x": 12,
      "y": 19,
      "rowNo": "17",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128656,
      "x": 14,
      "y": 19,
      "rowNo": "17",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128657,
      "x": 15,
      "y": 19,
      "rowNo": "17",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128658,
      "x": 16,
      "y": 19,
      "rowNo": "17",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128659,
      "x": 17,
      "y": 19,
      "rowNo": "17",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128660,
      "x": 18,
      "y": 19,
      "rowNo": "17",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128661,
      "x": 19,
      "y": 19,
      "rowNo": "17",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128662,
      "x": 20,
      "y": 19,
      "rowNo": "17",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128663,
      "x": 21,
      "y": 19,
      "rowNo": "17",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128664,
      "x": 22,
      "y": 19,
      "rowNo": "17",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128665,
      "x": 23,
      "y": 19,
      "rowNo": "17",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128666,
      "x": 24,
      "y": 19,
      "rowNo": "17",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128667,
      "x": 25,
      "y": 19,
      "rowNo": "17",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128668,
      "x": 26,
      "y": 19,
      "rowNo": "17",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128669,
      "x": 27,
      "y": 19,
      "rowNo": "17",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128670,
      "x": 28,
      "y": 19,
      "rowNo": "17",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128671,
      "x": 29,
      "y": 19,
      "rowNo": "17",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128672,
      "x": 30,
      "y": 19,
      "rowNo": "17",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128673,
      "x": 31,
      "y": 19,
      "rowNo": "17",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128674,
      "x": 32,
      "y": 19,
      "rowNo": "17",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128675,
      "x": 33,
      "y": 19,
      "rowNo": "17",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128676,
      "x": 34,
      "y": 19,
      "rowNo": "17",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128677,
      "x": 35,
      "y": 19,
      "rowNo": "17",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128678,
      "x": 37,
      "y": 19,
      "rowNo": "17",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128679,
      "x": 38,
      "y": 19,
      "rowNo": "17",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128680,
      "x": 39,
      "y": 19,
      "rowNo": "17",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128681,
      "x": 40,
      "y": 19,
      "rowNo": "17",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128682,
      "x": 41,
      "y": 19,
      "rowNo": "17",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128683,
      "x": 42,
      "y": 19,
      "rowNo": "17",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128684,
      "x": 43,
      "y": 19,
      "rowNo": "17",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128685,
      "x": 5,
      "y": 20,
      "rowNo": "18",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128686,
      "x": 6,
      "y": 20,
      "rowNo": "18",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128687,
      "x": 7,
      "y": 20,
      "rowNo": "18",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128688,
      "x": 8,
      "y": 20,
      "rowNo": "18",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128689,
      "x": 9,
      "y": 20,
      "rowNo": "18",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128690,
      "x": 10,
      "y": 20,
      "rowNo": "18",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128691,
      "x": 11,
      "y": 20,
      "rowNo": "18",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128692,
      "x": 12,
      "y": 20,
      "rowNo": "18",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128693,
      "x": 14,
      "y": 20,
      "rowNo": "18",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128694,
      "x": 15,
      "y": 20,
      "rowNo": "18",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128695,
      "x": 16,
      "y": 20,
      "rowNo": "18",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128696,
      "x": 17,
      "y": 20,
      "rowNo": "18",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128697,
      "x": 18,
      "y": 20,
      "rowNo": "18",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128698,
      "x": 19,
      "y": 20,
      "rowNo": "18",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128699,
      "x": 20,
      "y": 20,
      "rowNo": "18",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128700,
      "x": 21,
      "y": 20,
      "rowNo": "18",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128701,
      "x": 22,
      "y": 20,
      "rowNo": "18",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128702,
      "x": 23,
      "y": 20,
      "rowNo": "18",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128703,
      "x": 24,
      "y": 20,
      "rowNo": "18",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128704,
      "x": 25,
      "y": 20,
      "rowNo": "18",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128705,
      "x": 26,
      "y": 20,
      "rowNo": "18",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128706,
      "x": 27,
      "y": 20,
      "rowNo": "18",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128707,
      "x": 28,
      "y": 20,
      "rowNo": "18",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128708,
      "x": 29,
      "y": 20,
      "rowNo": "18",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128709,
      "x": 30,
      "y": 20,
      "rowNo": "18",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128710,
      "x": 31,
      "y": 20,
      "rowNo": "18",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128711,
      "x": 32,
      "y": 20,
      "rowNo": "18",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128712,
      "x": 33,
      "y": 20,
      "rowNo": "18",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128713,
      "x": 34,
      "y": 20,
      "rowNo": "18",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128714,
      "x": 35,
      "y": 20,
      "rowNo": "18",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128715,
      "x": 37,
      "y": 20,
      "rowNo": "18",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128716,
      "x": 38,
      "y": 20,
      "rowNo": "18",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128717,
      "x": 39,
      "y": 20,
      "rowNo": "18",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128718,
      "x": 40,
      "y": 20,
      "rowNo": "18",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128719,
      "x": 41,
      "y": 20,
      "rowNo": "18",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128720,
      "x": 42,
      "y": 20,
      "rowNo": "18",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128721,
      "x": 43,
      "y": 20,
      "rowNo": "18",
      "colNo": "36",
      "venueAreaId": 680
  },
  {
      "id": 128722,
      "x": 5,
      "y": 21,
      "rowNo": "19",
      "colNo": "37",
      "venueAreaId": 680
  },
  {
      "id": 128723,
      "x": 6,
      "y": 21,
      "rowNo": "19",
      "colNo": "35",
      "venueAreaId": 680
  },
  {
      "id": 128724,
      "x": 7,
      "y": 21,
      "rowNo": "19",
      "colNo": "33",
      "venueAreaId": 680
  },
  {
      "id": 128725,
      "x": 8,
      "y": 21,
      "rowNo": "19",
      "colNo": "31",
      "venueAreaId": 680
  },
  {
      "id": 128726,
      "x": 9,
      "y": 21,
      "rowNo": "19",
      "colNo": "29",
      "venueAreaId": 680
  },
  {
      "id": 128727,
      "x": 10,
      "y": 21,
      "rowNo": "19",
      "colNo": "27",
      "venueAreaId": 680
  },
  {
      "id": 128728,
      "x": 11,
      "y": 21,
      "rowNo": "19",
      "colNo": "25",
      "venueAreaId": 680
  },
  {
      "id": 128729,
      "x": 12,
      "y": 21,
      "rowNo": "19",
      "colNo": "23",
      "venueAreaId": 680
  },
  {
      "id": 128730,
      "x": 14,
      "y": 21,
      "rowNo": "19",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128731,
      "x": 15,
      "y": 21,
      "rowNo": "19",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128732,
      "x": 16,
      "y": 21,
      "rowNo": "19",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128733,
      "x": 17,
      "y": 21,
      "rowNo": "19",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128734,
      "x": 18,
      "y": 21,
      "rowNo": "19",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128735,
      "x": 19,
      "y": 21,
      "rowNo": "19",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128736,
      "x": 20,
      "y": 21,
      "rowNo": "19",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128737,
      "x": 21,
      "y": 21,
      "rowNo": "19",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128738,
      "x": 22,
      "y": 21,
      "rowNo": "19",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128739,
      "x": 23,
      "y": 21,
      "rowNo": "19",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128740,
      "x": 24,
      "y": 21,
      "rowNo": "19",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128741,
      "x": 25,
      "y": 21,
      "rowNo": "19",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128742,
      "x": 26,
      "y": 21,
      "rowNo": "19",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128743,
      "x": 27,
      "y": 21,
      "rowNo": "19",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128744,
      "x": 28,
      "y": 21,
      "rowNo": "19",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128745,
      "x": 29,
      "y": 21,
      "rowNo": "19",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128746,
      "x": 30,
      "y": 21,
      "rowNo": "19",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128747,
      "x": 31,
      "y": 21,
      "rowNo": "19",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128748,
      "x": 32,
      "y": 21,
      "rowNo": "19",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128749,
      "x": 33,
      "y": 21,
      "rowNo": "19",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128750,
      "x": 34,
      "y": 21,
      "rowNo": "19",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128751,
      "x": 35,
      "y": 21,
      "rowNo": "19",
      "colNo": "22",
      "venueAreaId": 680
  },
  {
      "id": 128752,
      "x": 14,
      "y": 22,
      "rowNo": "20",
      "colNo": "21",
      "venueAreaId": 680
  },
  {
      "id": 128753,
      "x": 15,
      "y": 22,
      "rowNo": "20",
      "colNo": "19",
      "venueAreaId": 680
  },
  {
      "id": 128754,
      "x": 16,
      "y": 22,
      "rowNo": "20",
      "colNo": "17",
      "venueAreaId": 680
  },
  {
      "id": 128755,
      "x": 17,
      "y": 22,
      "rowNo": "20",
      "colNo": "15",
      "venueAreaId": 680
  },
  {
      "id": 128756,
      "x": 18,
      "y": 22,
      "rowNo": "20",
      "colNo": "13",
      "venueAreaId": 680
  },
  {
      "id": 128757,
      "x": 19,
      "y": 22,
      "rowNo": "20",
      "colNo": "11",
      "venueAreaId": 680
  },
  {
      "id": 128758,
      "x": 20,
      "y": 22,
      "rowNo": "20",
      "colNo": "9",
      "venueAreaId": 680
  },
  {
      "id": 128759,
      "x": 21,
      "y": 22,
      "rowNo": "20",
      "colNo": "7",
      "venueAreaId": 680
  },
  {
      "id": 128760,
      "x": 22,
      "y": 22,
      "rowNo": "20",
      "colNo": "5",
      "venueAreaId": 680
  },
  {
      "id": 128761,
      "x": 23,
      "y": 22,
      "rowNo": "20",
      "colNo": "3",
      "venueAreaId": 680
  },
  {
      "id": 128762,
      "x": 24,
      "y": 22,
      "rowNo": "20",
      "colNo": "1",
      "venueAreaId": 680
  },
  {
      "id": 128763,
      "x": 25,
      "y": 22,
      "rowNo": "20",
      "colNo": "2",
      "venueAreaId": 680
  },
  {
      "id": 128764,
      "x": 26,
      "y": 22,
      "rowNo": "20",
      "colNo": "4",
      "venueAreaId": 680
  },
  {
      "id": 128765,
      "x": 27,
      "y": 22,
      "rowNo": "20",
      "colNo": "6",
      "venueAreaId": 680
  },
  {
      "id": 128766,
      "x": 28,
      "y": 22,
      "rowNo": "20",
      "colNo": "8",
      "venueAreaId": 680
  },
  {
      "id": 128767,
      "x": 29,
      "y": 22,
      "rowNo": "20",
      "colNo": "10",
      "venueAreaId": 680
  },
  {
      "id": 128768,
      "x": 30,
      "y": 22,
      "rowNo": "20",
      "colNo": "12",
      "venueAreaId": 680
  },
  {
      "id": 128769,
      "x": 31,
      "y": 22,
      "rowNo": "20",
      "colNo": "14",
      "venueAreaId": 680
  },
  {
      "id": 128770,
      "x": 32,
      "y": 22,
      "rowNo": "20",
      "colNo": "16",
      "venueAreaId": 680
  },
  {
      "id": 128771,
      "x": 33,
      "y": 22,
      "rowNo": "20",
      "colNo": "18",
      "venueAreaId": 680
  },
  {
      "id": 128772,
      "x": 34,
      "y": 22,
      "rowNo": "20",
      "colNo": "20",
      "venueAreaId": 680
  },
  {
      "id": 128773,
      "x": 37,
      "y": 21,
      "rowNo": "19",
      "colNo": "24",
      "venueAreaId": 680
  },
  {
      "id": 128774,
      "x": 38,
      "y": 21,
      "rowNo": "19",
      "colNo": "26",
      "venueAreaId": 680
  },
  {
      "id": 128775,
      "x": 39,
      "y": 21,
      "rowNo": "19",
      "colNo": "28",
      "venueAreaId": 680
  },
  {
      "id": 128776,
      "x": 40,
      "y": 21,
      "rowNo": "19",
      "colNo": "30",
      "venueAreaId": 680
  },
  {
      "id": 128777,
      "x": 41,
      "y": 21,
      "rowNo": "19",
      "colNo": "32",
      "venueAreaId": 680
  },
  {
      "id": 128778,
      "x": 42,
      "y": 21,
      "rowNo": "19",
      "colNo": "34",
      "venueAreaId": 680
  },
  {
      "id": 128779,
      "x": 43,
      "y": 21,
      "rowNo": "19",
      "colNo": "36",
      "venueAreaId": 680
  }
]
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      canvas_width: 0,
      canvas_height: 0,
    }
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    setTimeout(() => {
      Taro.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
    }, 1000);
  }

  init (res) {
    this.canvas = res && res[0].node
    const canvas = this.canvas
    this.ctx = canvas.getContext('2d')
    const ctx = this.ctx

    seats = seats.map((item, index) => {
      return {
          x: item.x,
          y: item.y,
          status: index % 2 === 0 ? 'Y' : 'N'
      }
    })
    this.avalibleSeats = {}
    let avalibleSeatsTemp = seats.filter((item) => item.status === 'Y')
    avalibleSeatsTemp.forEach(item => this.avalibleSeats[item.x + '_' + item.y] = true)
    

    seats.sort((a, b) => a.x - b.x)
    const max_x = seats[seats.length - 1].x

    seats.sort((a, b) => a.y - b.y)
    const max_y = seats[seats.length - 1].y
    CANVAS_WIDTH = max_x * CELL_WIDTH
    CANVAS_HEIGHT = max_y * CELL_HEIGHT

    if (!canvas.getContext) return

    this.setState({
      canvas_width: CANVAS_WIDTH,
      canvas_height: CANVAS_HEIGHT,
    })

    this.draw = () => {
      seats.forEach(item => {
          const { x, y, status} = item
          if (status === 'N') {
            ctx.fillStyle = 'gray'
          } else {
            if (selectedSeats[x + '_' + y]) {
                ctx.fillStyle = 'red'
            } else {
                ctx.fillStyle = 'black'
            }
          }
          ctx.fillRect((x - 1) * CELL_WIDTH, (y - 1) * CELL_HEIGHT, SEAT_WIDTH, SEAT_HEIGHT)
      })
    }
    this.draw()
  }

  click = (e) => {
    const x = e.touches[0].x
    const y = e.touches[0].y
    console.log('x is:', x);
    console.log('y is:', y);
    const point = {x: Math.ceil(x / CELL_WIDTH), y: Math.ceil(y / CELL_HEIGHT)}
    let seatPoint = this.avalibleSeats[point.x + '_' + point.y]
    if (seatPoint) {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        selectedSeats[point.x + '_' + point.y] = !selectedSeats[point.x + '_' + point.y]
        this.draw()
    }
}

  render () {
    const { canvas_width, canvas_height } = this.state
    return (
        <Canvas
          type='2d'
          id='canvas'
          onTouchStart={this.click}
          style={{ width: canvas_width, height: canvas_height }}></Canvas>
    )
  }
}