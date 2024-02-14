from rest_framework.response import Response
from rest_framework.decorators import api_view

from nestquest.models import HousingOffer, HousingRequest
from nestquest.serializers import HousingOfferSerializer, HousingRequestSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getRequests(request):

    query = request.query_params.get('keyword', '')
    
    housingrequests = HousingRequest.objects.filter(
        title__icontains=query)
    
    page = request.query_params.get('page')
    paginator = Paginator(housingrequests, 2)

    try:
        housingrequests = paginator.page(page)
    except PageNotAnInteger:
        housingrequests = paginator.page(1)
    except EmptyPage:
        housingrequests = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    housingrequests = HousingRequest.objects.all()
    serializer = HousingRequestSerializer(housingrequests, many=True)
    return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getRequest(request, pk):
    
    housingrequest = HousingOffer.objects.get(_id=pk)
    serializer = HousingOfferSerializer(housingrequest, many=False)
    return Response(serializer.data)