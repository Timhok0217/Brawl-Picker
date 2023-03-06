import brawlstats
import json
import copy
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
    players = []
    print(request.data)
    if request.method == 'GET':
        rankPlayers = client.get_rankings(ranking='players', limit=10)
        #nameBrawler = request.data['ent_name'] + ''
        rankBrawlers = client.get_rankings(ranking='brawlers', limit=5, brawler="mortis")
        #print(request.data)

    elif request.method == 'POST':
        print(request.data)

        isKey = request.data.keys()
        rankPlayers = client.get_rankings(ranking='players', limit=20)
        if 'ent_name' in isKey:
            nameBrawler = request.data['ent_name']
            print(nameBrawler)
            rankBrawlers = client.get_rankings(ranking='brawlers', limit=20, brawler=nameBrawler)
        else:
            rankBrawlers = client.get_rankings(ranking='brawlers', limit=20, brawler="shelly")


    dataHome = [{"rankPlayers": rankPlayers[::],
                 "rankBrawlers": rankBrawlers[::],
                }]

    results = YourSerializerHome(dataHome, many=True).data
    #return Response(results, template_name='assessments.html')
    return Response(results)


@api_view(['GET', 'POST'])
def index(request):
    client = brawlstats.Client(config.BRAWL_API_KEY)

    #rank = client.get_rankings("players", "ru", 10)

    # Получение информации о профиле игрока по тэгу
    # player = client.get_profile('9LVUJVVLL')
    if request.method == 'GET':
        player = client.get_profile('9J2RLRYYY')
        battle_log = client.get_battle_logs('9J2RLRYYY')
        try:
            club = client.get_club(player.club.tag)
        except:
            #print("No Club!")
            club = 0


    elif request.method == 'POST':
        print(request.data)
        player = client.get_player(request.data['ent_tag'])
        battle_log = client.get_battle_logs(request.data['ent_tag'])
        try:
            club = client.get_club(player.club.tag)
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
                 'battle_logs': battle_log[:10],
                 "club_info": 0,
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
                 'battle_logs': battle_log[:10],
                 "club_name": club.name,
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
