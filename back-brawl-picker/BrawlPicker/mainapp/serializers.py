from rest_framework import serializers


class YourSerializerHome(serializers.Serializer):
    rankPlayers = serializers.CharField()
    rankBrawlers = serializers.CharField()
    events = serializers.CharField()


class YourSerializer(serializers.Serializer):
    """Your data serializer, define your fields here."""
    name = serializers.CharField()
    tag = serializers.CharField()
    trophies = serializers.CharField()
    highest_trophies = serializers.CharField()
    exp_level = serializers.CharField()
    team_wins = serializers.CharField()
    solo_wins = serializers.CharField()
    duo_wins = serializers.CharField()
    player_icon_id = serializers.CharField()
    brawlers = serializers.CharField()
    name_color = serializers.CharField()
    power_play_points = serializers.CharField()
    battle_logs = serializers.CharField()
    club_name = serializers.CharField()
    club_tag = serializers.CharField()
    club_info = serializers.CharField()
    club_members = serializers.CharField()
    response_battle_logs = serializers.CharField()


# data = 231
# serializer = StudentSerializer(data, context={'request': request}, many=True)
# return Response(serializer.data)
