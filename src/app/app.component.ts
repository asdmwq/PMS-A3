import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  list, addCircle, create, shield, helpCircle, search, refresh,
  star, laptop, bed, shirt, hammer, cube, add, save, trash,
  checkmarkCircle, lockClosed, eyeOff, warning, searchOutline,
  ellipse, square, triangle, person, settings, logOut,
  menu, close, arrowBack, arrowForward, chevronBack, chevronForward,
  alertCircle, informationCircle, checkmark, closeCircle,
  documentText, clipboard, grid, images, camera, mic, navigate,
  notifications, options, pricetag, time, timer, globe, key,
  location, mail, call, flag, bookmark, heart, thumbsUp, thumbsDown,
  share, send, archive, book, briefcase, brush, bug, bulb, bus, car,
  cart, cash, chatbox, chatbubble, checkbox, checkmarkDone, cloudy,
  code, colorPalette, compass, contrast, copy, crop, cut, desktop,
  diamond, download, eye, film, filter, fish, folder, funnel,
  gift, globe as globeIcon, grid as gridIcon, happy, headset, help,
  home as homeIcon, hourglass, idCard, image, infinite, information,
  journal, key as keyIcon, keypad, language, laptop as laptopIcon, layers, leaf, library, link,
  list as listIcon, locate, location as locationIcon, lockOpen, logIn,
  logOut as logOutIcon, magnet, mail as mailIcon, male, man, map, medal, medical, mic as micIcon, micOff, moon, musicalNote,
  musicalNotes, navigate as navigateIcon, newspaper, notifications as notificationsIcon,
  notificationsOff, notificationsOutline, nuclear, nutrition, open, options as optionsIcon,
  paperPlane, partlySunny, pause, paw, pencil, people, person as personIcon,
  personAdd, personCircle, personRemove, phoneLandscape,
  phonePortrait, pieChart, pin, pint, pizza, planet,
  play, playBack, playCircle, playForward, playSkipBack, playSkipForward,
  podium, power, pricetag as pricetagIcon, pricetags, print, pulse, push,
  qrCode, radio, rainy, reader, receipt, recording, reload, remove,
  removeCircle, resize, restaurant, returnDownBack, returnDownForward,
  ribbon, rocket, sad, save as saveIcon,
  scan, school, search as searchIcon, send as sendIcon, server, settings as settingsIcon,
  shapes, share as shareIcon, shareSocial, shieldCheckmark,
  shirt as shirtIcon, shuffle, skull, snow, sparkles, speedometer, square as squareIcon,
  star as starIcon, starHalf, starOutline, statsChart, stop, stopwatch, storefront,
  subway, sunny, swapHorizontal, swapVertical, sync, syncCircle, tabletLandscape,
  tabletPortrait, telescope, tennisball, terminal, text, thermometer, thumbsDown as thumbsDownIcon,
  thumbsUp as thumbsUpIcon, thunderstorm, time as timeIcon, timer as timerIcon,
  today, toggle, trailSign, train, transgender, trash as trashIcon, trashBin,
  trendingDown, trendingUp, triangle as triangleIcon, trophy, tv, umbrella,
  videocam, volumeHigh, volumeLow, volumeMedium, volumeMute,
  volumeOff, walk, wallet, warning as warningIcon, watch, water, wifi, wine,
  woman
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    addIcons({
      'list': list, 'add-circle': addCircle, 'create': create, 'shield': shield,
      'help-circle': helpCircle, 'search': search, 'refresh': refresh,
      'star': star, 'laptop': laptop, 'bed': bed, 'shirt': shirt, 'hammer': hammer,
      'cube': cube, 'add': add, 'save': save, 'trash': trash,
      'checkmark-circle': checkmarkCircle, 'lock-closed': lockClosed,
      'shield-checkmark': shieldCheckmark, 'eye-off': eyeOff, 'warning': warning,
      'phone-portrait': phonePortrait, 'search-outline': searchOutline,
      'arrow-back': arrowBack
    });
  }
}
