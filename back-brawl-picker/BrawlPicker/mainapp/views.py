import brawlstats
import json
import copy
import requests
from django.shortcuts import render
from requests import get
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response


from . import config
from .serializers import YourSerializer, YourSerializerHome


def ip(request):
    IPAddr = get('https://api.ipify.org').text
    return render(request, 'mainapp/ip.html', {'IPAddr':IPAddr})

@api_view(['GET', 'POST'])
#@renderer_classes((TemplateHTMLRenderer, JSONRenderer))

def apiHome(request):
    client = brawlstats.Client(config.BRAWL_API_KEY)
    headers = {
        'authorization': 'Bearer ' + config.BRAWL_API_KEY,
    }
    players = []

    responseEvents = requests.get(f'https://api.brawlstars.com/v1/events/rotation', headers=headers)
    #print(response.__dict__) #Вывод всего
    #print(responseEvents.text)

    responseBrawlers = requests.get(f'https://api.brawlstars.com/v1/brawlers', headers=headers).text
    dictBrawlers = json.loads(responseBrawlers)['items']
    #print(dictBrawlers)

    responseRankPlayers = ''
    responseRankBrawlers = ''

    print(request.data)
    if request.method == 'GET':
        rankPlayers = client.get_rankings(ranking='players', limit=10)
        #nameBrawler = request.data['ent_name'] + ''
        rankBrawlers = client.get_rankings(ranking='brawlers', limit=5, brawler="mortis")
        #print(request.data)

    elif request.method == 'POST':
        print(request.data)

        isKey = request.data.keys()
        #rankPlayers = client.get_rankings(ranking='players', limit=20)

        responseRankPlayers = requests.get(f'https://api.brawlstars.com/v1/rankings/global/players?limit=100', headers=headers).text
        #print(responseRankPlayers.text)
        if 'ent_name' in isKey:
            nameBrawler = request.data['ent_name']
            print(nameBrawler)

            thisDictForBralwerId = ""
            answer=""
            for x in dictBrawlers :
                thisDictForBralwerId = x.get('name')
                if thisDictForBralwerId == nameBrawler.upper():
                    answer = x.get('id', 16000000)
                    break

            print(answer)

            #rankBrawlers = client.get_rankings(ranking='brawlers', limit=20, brawler=nameBrawler)
            responseRankBrawlers = requests.get(
                f'https://api.brawlstars.com/v1/rankings/global/brawlers/{answer}?limit=100',
                headers=headers).text
            #print(responseRankBrawlers.text)
        else:
            responseRankBrawlers = requests.get(f'https://api.brawlstars.com/v1/rankings/global/brawlers/16000000?limit=100',
                                               headers=headers).text
            #print(responseRankBrawlers.text)
            #rankBrawlers = client.get_rankings(ranking='brawlers', limit=20, brawler="shelly")


    dataHome = [{"rankPlayers": responseRankPlayers,
                 "rankBrawlers": responseRankBrawlers,
                 "events": responseEvents.text,
                }]

    results = YourSerializerHome(dataHome, many=True).data
    #return Response(results, template_name='assessments.html')
    return Response(results)


@api_view(['GET', 'POST'])
def index(request):
    client = brawlstats.Client(config.BRAWL_API_KEY)

    headers = {
        'authorization': 'Bearer ' + config.BRAWL_API_KEY,
    }


    #rank = client.get_rankings("players", "ru", 10)

    # Получение информации о профиле игрока по тэгу
    # player = client.get_profile('9LVUJVVLL')
    if request.method == 'GET':
        player = client.get_profile('9J2RLRYYY')
        battle_log = client.get_battle_logs('9J2RLRYYY')
        #constants = client.get_constants("maps")
        #print(constants)
        try:
            club = client.get_club(player.club.tag)
        except:
            #print("No Club!")
            club = 0


    elif request.method == 'POST':
        print(request.data)
        responseBattleLogs = requests.get(f'https://api.brawlstars.com/v1/players/%23{request.data["ent_tag"][1::]}/battlelog', headers=headers)
        # print(response.__dict__) #Вывод всего
        #print(responseBattleLogs.text)
        player = client.get_player(request.data['ent_tag'])
        battle_log = client.get_battle_logs(request.data['ent_tag'])
        # constants = client.get_constants(key='maps')
        # print(constants)
        try:
            club = client.get_club(player.club.tag)

            #Для прямого вызова к клубу
            #responseClub = requests.get(f'https://api.brawlstars.com/v1/clubs/%23{player.club.tag[1::]}', headers=headers)
            #print("responseClub", responseClub.text)
        except:
            #print("No Club!")
            club = 0

    if club == 0:
        data = [{'name': player.name,
                 'tag': player.tag,
                 "club_tag": 0,
                 'trophies': player.trophies,
                 'highest_trophies': player.highest_trophies,
                 'exp_level': player.exp_level,
                 'team_wins': player.x3vs3_victories,
                 'solo_wins': player.solo_victories,
                 'duo_wins': player.duo_victories,
                 'player_icon_id': player.icon,
                 'brawlers': player.brawlers,
                 'name_color': player.name_color,
                 'power_play_points': player.power_play_points,
                 'battle_logs': battle_log[::],
                 "club_name": 0,
                 "club_info": 0,
                 "club_members": 0,
                 "response_battle_logs": responseBattleLogs.text,
                 }]
    else:
        data = [{'name': player.name,
                 'tag': player.tag,
                 "club_tag": player.club.tag,
                 'trophies': player.trophies,
                 'highest_trophies': player.highest_trophies,
                 'exp_level': player.exp_level,
                 'team_wins': player.x3vs3_victories,
                 'solo_wins': player.solo_victories,
                 'duo_wins': player.duo_victories,
                 'player_icon_id': player.icon,
                 'brawlers': player.brawlers,
                 'name_color': player.name_color,
                 'power_play_points': player.power_play_points,
                 'battle_logs': battle_log[::],
                 "club_name": player.club.name,
                 "club_info": [club.tag,
                               club.name,
                               club.description,
                               club.type,
                               club.trophies,
                               club.required_trophies],
                 "club_members": club.members,
                 "response_battle_logs": responseBattleLogs.text,
                 }]


    # Получение информации о последних 25 боях игрока по тэгу
    battles = client.get_battle_logs('8Y8L02V2Q')
    #battles = client.get_battle_logs('UL0GCC8')
    #print(battles[0].battle.mode)
    gemgrab_counter = 0
    gemgrab_victory_counter = 0

    for item in battles:
        if item.battle.mode == "gemGrab":
            gemgrab_counter += 1
            if item.battle.result == "victory":
                gemgrab_victory_counter += 1

    gemgrab_context = {'battles_count': gemgrab_counter,
                       'victories': gemgrab_victory_counter,
                       'percent_victories': round(gemgrab_victory_counter / gemgrab_counter * 100, 2),
                       }

    context = {'data': data, 'gemgrab_context': gemgrab_context}
    results = YourSerializer(data, many=True).data
    return Response(results)
    #return Response(results)


    # return render(request, 'mainapp/index.html', context)
