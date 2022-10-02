import brawlstats
from django.shortcuts import render
from requests import get
from rest_framework.decorators import api_view
from rest_framework.response import Response


from . import config
from .serializers import YourSerializer


def ip(request):


    IPAddr = get('https://api.ipify.org').text
    return render(request, 'mainapp/ip.html', {'IPAddr':IPAddr})

@api_view(['GET', 'POST'])
def index(request):
    client = brawlstats.Client(config.BRAWL_API_KEY)

    # Получение информации о профиле игрока по тэгу
    # player = client.get_profile('9LVUJVVLL')
    if request.method == 'GET':
        player = client.get_profile('9J2RLRYYY')
        battle_log = client.get_battle_logs('9J2RLRYYY')

    elif request.method == 'POST':
        print(request.data)
        player = client.get_player(request.data['ent_tag'])
        battle_log = client.get_battle_logs(request.data['ent_tag'])
    data = [{'name': player.name,
            'tag': player.tag,
            'trophies': player.trophies,
            'highest_trophies': player.highest_trophies,
            'exp_level': player.exp_level,
            'team_wins': player.x3vs3_victories,
            'solo_wins': player.solo_victories,
            'duo_wins': player.duo_victories,
            'player_icon_id': player.icon,
            'brawlers': player.brawlers,
            'power_play_points': player.power_play_points,
            'battle_logs': battle_log[:10],
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


    # return render(request, 'mainapp/index.html', context)
